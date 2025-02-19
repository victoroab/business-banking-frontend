import { useEffect, useState } from "react";
import Switch from "../../../components/Switch/Swtich";
import {
  useGetAllNotificationPreferenceMutation,
  useUpdateNotificationPreferenceMutation,
} from "../../../service/security";
import {
  creditPreference,
  debitPreference,
  errorHandler,
} from "../../../utils";
import { toast } from "react-toastify";
interface NotificationPreferences {
  creditEmail: boolean;
  creditSms: boolean;
  creditPush: boolean;
  creditWhatsapp: boolean;
  debitEmail: boolean;
  debitSms: boolean;
  debitPush: boolean;
  debitWhatsapp: boolean;
}
const NotificationPreference = () => {
  const [getAllPreferences] = useGetAllNotificationPreferenceMutation();
  const [updatePreference] = useUpdateNotificationPreferenceMutation();
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    creditEmail: false,
    creditSms: false,
    creditPush: false,
    creditWhatsapp: false,
    debitEmail: false,
    debitSms: false,
    debitPush: false,
    debitWhatsapp: false,
  });
  const [isAllCreditChecked, setIsAllCreditChecked] = useState(false);
  const [isAllDebitChecked, setIsAllDebitChecked] = useState(false);

  const handleFetchPreferences = async () => {
    try {
      const response = await getAllPreferences().unwrap();
      setPreferences(response.data);
      setIsAllCreditChecked(
        response.data.creditEmail &&
          response.data.creditSms &&
          response.data.creditPush &&
          response.data.creditWhatsapp
      );
      setIsAllDebitChecked(
        response.data.debitEmail &&
          response.data.debitSms &&
          response.data.debitPush &&
          response.data.debitWhatsapp
      );
    } catch (error) {
      console.error("Failed to fetch preferences", error);
    }
  };

  useEffect(() => {
    handleFetchPreferences();
  }, []);

  const handleToggle = async (key: string, value: boolean) => {
    try {
      const updatedPreferences = { ...preferences, [key]: value };
      setPreferences(updatedPreferences);
      const response = await updatePreference(updatedPreferences).unwrap();
      toast.success(response?.message);
    } catch (error) {
      console.error("Failed to update preferences", error);
      errorHandler(error);
    }
  };

  const handleToggleCredit = async (checked: boolean) => {
    try {
      const updatedPreferences = {
        ...preferences,
        creditEmail: checked,
        creditSms: checked,
        creditPush: checked,
        creditWhatsapp: checked,
      };
      setPreferences(updatedPreferences);
      setIsAllCreditChecked(checked);
      const response = await updatePreference(updatedPreferences).unwrap();
      toast.success(response?.message);
    } catch (error) {
      errorHandler(error);
    }
  };

  const handleToggleDebit = async (checked: boolean) => {
    try {
      const updatedPreferences = {
        ...preferences,
        debitEmail: checked,
        debitSms: checked,
        debitPush: checked,
        debitWhatsapp: checked,
      };
      setPreferences(updatedPreferences);
      setIsAllDebitChecked(checked);

      const response = await updatePreference(updatedPreferences).unwrap();
      toast.success(response?.message);
    } catch (error) {
      errorHandler(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Notification Preferences
        </h3>
      </div>

      <div
        className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <div
          className={`flex justify-between items-center gap-6 w-full "mb-2"
            `}
        >
          <div className="flex flex-col">
            <p className={`${"font-semibold"}`}>Payment (Credit)</p>
            <p className="tit text-xs text-lightGreyColor font-workSans">
              Notifications for credits into you account from transfers, etc
            </p>
          </div>
          <Switch
            isChecked={isAllCreditChecked}
            settings
            onToggle={handleToggleCredit}
          />
        </div>
        {creditPreference?.map((item: any) => (
          <div
            className={`flex justify-between items-center gap-6 w-full ${
              item?.id && "mb-2"
            }`}
            key={item?.id}
          >
            <div className="flex flex-col">
              <p className={`${"font-normal"}`}>{item?.title}</p>
              <p className="tit text-xs text-lightGreyColor font-workSans">
                {item?.subText}
              </p>
            </div>
            <Switch
              isChecked={
                preferences[
                  `credit${
                    item.title?.charAt(0).toUpperCase() +
                    item.title?.slice(1).toLowerCase()
                  }` as keyof NotificationPreferences
                ]
              }
              settings
              onToggle={(isChecked) =>
                handleToggle(
                  `credit${
                    item.title?.charAt(0).toUpperCase() +
                    item.title?.slice(1).toLowerCase()
                  }`,
                  isChecked
                )
              }
            />
          </div>
        ))}
      </div>

      <div
        className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <div
          className={`flex justify-between items-center gap-6 w-full "mb-2"
            `}
        >
          <div className="flex flex-col">
            <p className={`${"font-semibold"}`}>Payment (Debit)</p>
            <p className="tit text-xs text-lightGreyColor font-workSans">
              Notifications for debits into you account from transfers, etc
            </p>
          </div>
          <Switch
            isChecked={isAllDebitChecked}
            settings
            onToggle={handleToggleDebit}
          />
        </div>
        {debitPreference?.map((item: any) => (
          <div
            className={`flex justify-between items-center gap-6 w-full ${
              item?.id && "mb-2"
            }`}
            key={item?.id}
          >
            <div className="flex flex-col">
              <p className={`${"font-normal"}`}>{item?.title}</p>
              <p className="tit text-xs text-lightGreyColor font-workSans">
                {item?.subText}
              </p>
            </div>
            <Switch
              isChecked={
                preferences[
                  `debit${
                    item.title?.charAt(0).toUpperCase() +
                    item.title?.slice(1).toLowerCase()
                  }` as keyof NotificationPreferences
                ]
              }
              settings
              onToggle={(isChecked) =>
                handleToggle(
                  `debit${
                    item.title?.charAt(0).toUpperCase() +
                    item.title?.slice(1).toLowerCase()
                  }`,
                  isChecked
                )
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreference;
