import { CloseIcon } from "../../../assets/svg/Auth";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { ActivityProps } from "../../../interfaces/Global";
import { formatTimestamp } from "../../../utils";
import PopUp from "../../PopUps/PopUp";

interface DetailsProps {
  selectedRow: ActivityProps;
  refetch: any;
}
const ActivityDetails = ({ selectedRow }: DetailsProps) => {
  const { handleShow } = useGlobalHooks();
  const handleClose = () => {
    handleShow(`transaction-details`);
  };

  return (
    <PopUp id={"transaction-details"}>
      <div className="bg-white rounded-lg flex flex-col py-14 px-32 gap-10 w-[650px]">
        <div className="gap-4 flex  justify-between items-center">
          <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
            Activity Details
          </h3>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="details flex flex-col gap-6">
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                User
              </p>
              <p className="text-base text-greyColr font-workSans font-medium">
                {selectedRow?.businessId}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Date
              </p>
              <p className="text-base text-greyColr font-workSans font-medium">
                {formatTimestamp(selectedRow?.createdAt as string, true)}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Action
              </p>
              <p className="text-sm  bg-[#f7f8ff] text-statusBlue p-1 font-medium font-workSans">
                {selectedRow?.action}
              </p>
            </div>
            <div className="flex flex-col items-end justify-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Status
              </p>
              <p
                className={`text-base font-workSans font-medium ${
                  selectedRow?.status === "SUCCESS"
                    ? "text-positive bg-[#f3fbf8]"
                    : "text-nagative bg-[#fff7f5]"
                }`}
              >
                {selectedRow?.status}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Description
              </p>
              <p className="text-base text-greyColr font-workSans gap-2 font-medium items-center flex">
                {selectedRow?.description}{" "}
              </p>
            </div>

            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                IP Address
              </p>
              <p className="text-base text-greyColr font-workSans font-medium">
                {selectedRow?.ipAddress}
              </p>
            </div>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default ActivityDetails;
