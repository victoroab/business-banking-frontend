import Switch from "../../../components/Switch/Swtich";
import { creditPreference, debitPreference } from "../../../utils";

const NotificationPreference = () => {
  const handleToggle = () => {};

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
        {creditPreference?.map((item: any) => (
          <div
            className={`flex justify-between items-center gap-6 w-full ${
              item?.id && "mb-2"
            }`}
            key={item?.id}
          >
            <div className="flex flex-col">
              <p
                className={`${
                  item?.id === 1 ? "font-semibold" : "font-normal"
                }`}
              >
                {item?.title}
              </p>
              <p className="tit text-xs text-lightGreyColor font-workSans">
                {item?.subText}
              </p>
            </div>
            <Switch settings onToggle={handleToggle} />
          </div>
        ))}
      </div>

      <div
        className="p-4 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        {debitPreference?.map((item: any) => (
          <div
            className={`flex justify-between items-center gap-6 w-full ${
              item?.id && "mb-2"
            }`}
            key={item?.id}
          >
            <div className="flex flex-col">
              <p
                className={`${
                  item?.id === 1 ? "font-semibold" : "font-normal"
                }`}
              >
                {item?.title}
              </p>
              <p className="tit text-xs text-lightGreyColor font-workSans">
                {item?.subText}
              </p>
            </div>
            <Switch settings onToggle={handleToggle} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPreference;
