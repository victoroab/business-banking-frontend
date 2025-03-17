import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useRef, useState } from "react";
import { ArrowDownIcon } from "../../../../assets/svg/PayBill";
import {
  selectBillPayment,
  setAirtimeDataCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
import InputToken from "./InputToken";
import GeneralModal from "../../../../components/PopUps/GeneralModal";

const AirtimeConfirmation = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const [openPinModal, setOpenPinModal] = useState(false);
  const dispatch = useAppDispatch();
  const { airtimeBundlePayload } = useAppSelector(selectBillPayment);

  const handleSubmit = () => {
    setOpenPinModal(true);
  };

  const scrollToBottom = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex flex-col gap-10 pr-6 relative">
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
          Airtime Amount
        </p>

        <h3 className="text-pryColor font-extrabold text-2xl font-bricolage leading-6">
          &#8358;{airtimeBundlePayload?.amount}.00
        </h3>
      </div>

      <div className="details flex flex-col gap-4">
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Purchase Details
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
                &#8358;{airtimeBundlePayload?.amount}.00
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
                &#8358;{airtimeBundlePayload?.amount}.00
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
          <div className="grid grid-cols-2 gap-10 w-full">
            <div className="det flex flex-col gap-2">
              <p className="tit text-sm text-greyColr font-workSans font-medium">
                {airtimeBundlePayload?.phoneNumber}
              </p>
            </div>
            <div className="flex flex-col items-end ">
              <p
                className="tit text-sm  text-secColor font-normal font-workSans cursor-pointer"
                onClick={() => dispatch(setAirtimeDataCurrentStep(4))}
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
        <div
          className="flex bg-white rounded-3xl text-pryColor font-bricolage items-center gap-2 fixed bottom-[20px] px-6 py-3 font-semibold right-[320px] cursor-pointer"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
          onClick={scrollToBottom}
        >
          <ArrowDownIcon />
          Scroll Down
        </div>
        <div ref={formRef}></div>
      </div>

      {openPinModal && (
        <GeneralModal>
          <InputToken setOpenPinModal={setOpenPinModal} />
        </GeneralModal>
      )}
    </div>
  );
};

export default AirtimeConfirmation;
