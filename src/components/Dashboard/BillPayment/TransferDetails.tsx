import { CloseIcon } from "../../../assets/svg/Auth";
import { CopyIcon } from "../../../assets/svg/CustomSVGs";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { TransactionProps } from "../../../interfaces/service/billPayment";
import { copyToClipboard, formatTimestamp } from "../../../utils";
import PopUp from "../../PopUps/PopUp";

interface DetailsProps {
  selectedRow: TransactionProps;
  refetch: any;
}
const TransferDetails = ({ selectedRow }: DetailsProps) => {
  const { handleShow } = useGlobalHooks();
  // const [deleteBeneficiary, { isLoading }] = useDeleteBeneficiaryMutation();
  const handleClose = () => {
    handleShow(`transaction-details`);
  };

  // const handleDeleteBeneficiary = async () => {
  //   try {
  //     const response = await deleteBeneficiary(selectedRow?.id as string);
  //     console.log(response);
  //     refetch();
  //   } catch (error: unknown) {
  //     errorHandler(error);
  //   }
  // };

  return (
    <PopUp id={"transaction-details"}>
      <div className="bg-white rounded-lg flex flex-col py-10 px-32 gap-10 w-[650px]">
        <div className="gap-4 flex  justify-between items-center">
          <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
            Transaction Details
          </h3>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="details flex flex-col gap-6">
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Beneficiary
              </p>
              <p className="text-base text-greyColr font-workSans font-medium">
                {selectedRow?.beneficiary?.phoneNumber}
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
                Transaction Type
              </p>
              <p className="text-sm  bg-[#f7f8ff] text-statusBlue p-1 font-medium font-workSans">
                {selectedRow?.beneficiary?.beneficiaryType?.toLocaleUpperCase()}
              </p>
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Fees
              </p>
              <p className="text-base text-nagative font-workSans font-medium">
                - &#8358;0.00
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-end justify-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Account Number
              </p>
              <p className="text-base text-greyColr font-workSans gap-2 font-medium items-center flex">
                {selectedRow?.reference}{" "}
                <span
                  className="copy text-xs text-secColor flex items-center gap-2 cursor-pointer"
                  onClick={() =>
                    copyToClipboard(selectedRow?.reference as string)
                  }
                >
                  <CopyIcon />
                </span>
              </p>
            </div>

            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Debit Account
              </p>
              <p className="text-base text-greyColr font-workSans font-medium">
                {selectedRow?.beneficiary?.bankName}
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
              Share Receipt
            </button>
            <button className="red-outline-btn w-full">Report An Issue</button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default TransferDetails;
