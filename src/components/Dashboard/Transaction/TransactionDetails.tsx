import { CloseIcon } from "../../../assets/svg/Auth";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { RowDataProps } from "../../../interfaces/Global";
import PopUp from "../../PopUps/PopUp";
interface TransactionDetailsProps {
  selectedRow: RowDataProps;
}
const TransactionDetails = ({ selectedRow }: TransactionDetailsProps) => {
  const { handleShow } = useGlobalHooks();

  const handleClose = () => {
    handleShow(`transaction-details`);
  };
  return (
    <PopUp id={"transaction-details"}>
      <div className="bg-white rounded-lg flex flex-col py-10 px-20 gap-10 w-[650px]">
        <div className="gap-4 flex  justify-between items-center">
          <h3 className="text-pryColor font-semibold text-lg font-bricolage leading-6">
            Transaction Details
          </h3>
          <CloseIcon className="cursor-pointer" onClick={handleClose} />
        </div>

        <div className="gap-4 flex flex-col justify-center items-center">
          <p
            className={`rounded-2xl flex items-center py-2 px-6 text-center ${
              selectedRow?.status === "successful"
                ? "text-positive bg-[#f3fbf8]"
                : "text-nagative bg-[#fff7f5]"
            }`}
          >
            {selectedRow?.status}
          </p>

          <h3 className="text-pryColor font-bold text-xl font-bricolage leading-6">
            NGN {new Intl.NumberFormat().format(selectedRow?.amount as number)}
          </h3>
        </div>

        <div className="details flex flex-col gap-6">
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                {selectedRow?.sender}
              </p>
              <p className="text-base text-greyColr font-workSans">
                Oluwatobi Oseni
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Beneficiary
              </p>
              <p className="text-base text-greyColr font-workSans">
                Bamidele Akinyemi
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Financial Institution
              </p>
              <p className="text-base text-greyColr font-workSans">
                Oluwatobi Oseni
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Date
              </p>
              <p className="text-base text-greyColr font-workSans">
                {selectedRow?.createdAt}
              </p>
            </div>
          </div>

          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Transaction Type
              </p>
              <p className="text-sm  bg-[#f7f8ff] text-statusBlue p-1 font-workSans">
                {selectedRow?.transactionType?.toLocaleUpperCase()}
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Transaction Reference
              </p>
              <p className="text-base text-greyColr font-workSans">
                1234567890
              </p>
            </div>
          </div>
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Narration
              </p>
              <p className="text-base text-greyColr font-workSans">
                Take Icecream
              </p>
            </div>
            <div className="flex flex-col justify-end items-end">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Debit Account
              </p>
              <p className="text-sm bg-[#f7f8ff] text-statusBlue p-1 font-workSans">
                POS
              </p>
            </div>
          </div>
          <div className="column flex justify-between items-center">
            <div className="flex flex-col items-start justify-start">
              <p className="tit text-sm text-lightGreyColor font-workSans">
                Fees
              </p>
              <p className="text-sm text-nagative font-semibold font-workSans">
                -#50.00
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
            <button
              className="red-outline-btn w-full"
              type="submit"
              // onClick={handleSubmit}
            >
              Report An Issue
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default TransactionDetails;
