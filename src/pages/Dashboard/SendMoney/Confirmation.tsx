import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { AlertLogoIcon } from "../../../assets/svg/Sidebar";
import PopUp from "../../../components/PopUps/PopUp";
import { SuccessIcon } from "../../../assets/svg/CustomSVGs";
import {
  selectTransaction,
  setTransactionCurrentStep,
} from "../../../store/slice/transactionSlice";
import InputToken from "./InputToken";
import { useDispatch } from "react-redux";

const Confirmation = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const dispatch = useDispatch();
  const { sendMoneyPayload } = useAppSelector(selectTransaction);
  const handleSubmit = () => {
    handleShow("input-pin");
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="gap-4 flex flex-col justify-center items-center">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Confirmation
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please confirm the transaction details you have entered
        </p>
      </div>

      <div className="gap-4 flex flex-col justify-center items-center">
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Transfer Amount
        </p>

        <h3 className="text-pryColor font-extrabold text-2xl font-bricolage leading-6">
          &#8358;{sendMoneyPayload?.amount}.00
        </h3>
      </div>

      <div className="details flex flex-col gap-4">
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Transfter Details
        </p>

        <div
          className="p-4 gap-4 rounded-md items-center flex flex-col w-full"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        >
          <div className="grid grid-cols-2 gap-10 w-full">
            <div className="det">
              <p className="tit text-sm text-greyColr font-workSans">Amount:</p>
              <p className="text-sm text-greyColr font-workSans">Fee:</p>
            </div>
            <div
              className="flex flex-col justify-end items-end
          "
            >
              <p className="tit text-sm  text-amount font-semibold font-workSans">
                &#8358;{sendMoneyPayload?.amount}.00
              </p>
              <p className="va text-amount font-semibold text-sm font-workSans">
                &#8358;0.00
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 w-full border-t pt-4">
            <div className="det">
              <p className="tit text-sm text-greyColr font-workSans">
                Total Debit:
              </p>
            </div>
            <div
              className="det
          "
            >
              <p className="tit  font-workSanstext-sm  text-amount font-semibold flex flex-col justify-end items-end">
                &#8358;{sendMoneyPayload?.amount}.00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="details flex flex-col gap-4">
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Beneficiary Details
        </p>

        <div className="p-4 gap-4 items-center flex flex-col w-full bg-[#f7f8ff] rounded-xl">
          <div className="flex items-center justify-between w-full">
            <div className="det flex flex-col gap-2">
              <div className="items-center flex gap-4">
                <div className="flex">
                  <AlertLogoIcon />
                </div>
                <div className="flex flex-col">
                  <p className="text-greyColr font-workSans  flex gap-2  items-center rounded-md py-1 leading-4 font-normal text-sm">
                    {sendMoneyPayload?.accountName}
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-normal flex gap-2 items-center text-sm">
                    Account Number:
                    <span className="text-sm font-medium">
                      {sendMoneyPayload?.accountNumber}
                    </span>
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-normal gap-2 flex items-center text-sm">
                    Bank Name:
                    <span className="text-sm font-medium">
                      {sendMoneyPayload?.bankName}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col justify-end items-end
          "
            >
              <p
                className="tit text-sm  text-secColor font-normal font-workSans cursor-pointer"
                onClick={() => dispatch(setTransactionCurrentStep(2))}
              >
                Change
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="form">
        <div className="flex justify-center items-center w-full gap-6">
          <button
            className="main-btn w-full"
            type="submit"
            onClick={handleSubmit}
          >
            Next
          </button>
        </div>
      </div>

      {toggle["input-pin"] && <InputToken />}
    </div>
  );
};

export default Confirmation;
