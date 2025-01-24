import { CloseIcon } from "../../../../assets/svg/Auth";
import { useGlobalHooks } from "../../../../hooks/globalHooks";
import { AirtimeRowDataProps } from "../../../../interfaces/Global";
import { BeneficiaryData } from "../../../../interfaces/service/beneficiary";
import { useDeleteBeneficiaryMutation } from "../../../../service/beneficiary";
import { errorHandler, formatTimestamp } from "../../../../utils";
import PopUp from "../../../PopUps/PopUp";
import Spinner from "../../../Spinner/Spinner";

interface DetailsProps {
  selectedRow: AirtimeRowDataProps;
  refetch: () => Promise<{ data?: BeneficiaryData[]; error?: unknown }>;
}
const AirtimeDataDetails = ({ selectedRow, refetch }: DetailsProps) => {
  const { handleShow } = useGlobalHooks();
  const [deleteBeneficiary, { isLoading }] = useDeleteBeneficiaryMutation();
  const handleClose = () => {
    handleShow(`transaction-details`);
  };

  const handleDeleteBeneficiary = async () => {
    try {
      const response = await deleteBeneficiary(selectedRow?.id as string);
      console.log(response);
      refetch();
    } catch (error: unknown) {
      errorHandler(error);
    }
  };
  return (
    <PopUp id={"transaction-details"}>
      <div className="bg-white rounded-lg flex flex-col py-10 px-32 gap-10 w-[650px]">
        <div className="gap-4 flex  justify-between items-center">
          <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
            Beneficiary Details
          </h3>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="details flex flex-col gap-6">
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Phone Number
              </p>
              <p className="text-base text-greyColr font-workSans">
                {selectedRow?.phoneNumber}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Network Provider
              </p>
              <p className="text-base text-greyColr font-workSans">
                {selectedRow?.networkProvider}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Transaction Type
              </p>
              <p className="text-sm  bg-[#f7f8ff] text-statusBlue p-1 font-workSans">
                {selectedRow?.beneficiaryType?.toLocaleUpperCase()}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Date Added
              </p>
              <p className="text-base text-greyColr font-workSans">
                {formatTimestamp(selectedRow?.createdAt, true)}
              </p>
            </div>
          </div>
        </div>
        <div className="form">
          <div className="flex flex-col w-full gap-4">
            <button
              className="main-btn w-full"
              type="submit"
              // onClick={handleSubmit}
            >
              Edit Beneficiary
            </button>
            <button
              className="red-outline-btn w-full"
              onClick={handleDeleteBeneficiary}
            >
              {isLoading ? <Spinner /> : "Delete Beneficiary"}
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default AirtimeDataDetails;
