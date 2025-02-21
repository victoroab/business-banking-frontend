import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { AlertLogoIcon } from "../../../../assets/svg/Sidebar";
import { selectPOS, setPosCurrentStep } from "../../../../store/slice/posSlice";
import { useState } from "react";
import GeneralModal from "../../../../components/PopUps/GeneralModal";
import InputToken from "./InputToken";
const PosConfirmation = () => {
  const [openPinModal, setOpenPinModal] = useState(false);
  const dispatch = useAppDispatch();
  const { requestPOSPayload } = useAppSelector(selectPOS);
  const handleSubmit = () => {
    setOpenPinModal(true);
  };

  return (
    <div className="flex flex-col gap-10 pr-6 ">
      <div className="gap-4 flex flex-col justify-center items-center">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Confirmation
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please confirm the request you have endtered
        </p>
      </div>

      <div className="gap-4 flex flex-col justify-center items-center">
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          POS Device
        </p>

        <h3 className="text-pryColor font-extrabold text-2xl font-bricolage leading-6">
          Android POS
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
                #5000.00
              </p>
              <p className="va text-amount font-semibold text-sm font-workSans">
                #500.00
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
                #5500.00
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="details flex flex-col gap-4">
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Debit Account
        </p>

        <div className="p-4 gap-4 items-center flex flex-col w-full bg-[#f7f8ff] rounded-xl">
          <div className="flex items-center justify-between w-full">
            <div className="det flex flex-col gap-2">
              <div className="items-center flex gap-2">
                <div className="flex">
                  <AlertLogoIcon />
                </div>
                <div className="flex flex-col">
                  <p className="text-greyColr font-workSans  flex gap-2  items-center rounded-md py-1 leading-4 font-normal text-sm">
                    {requestPOSPayload?.merchantName}
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-normal flex items-center text-sm">
                    Account Number:
                    <span className="text-sm font-medium">1234567890</span>
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
                onClick={() => dispatch(setPosCurrentStep(3))}
              >
                Change
              </p>
              <p className="va text-nagative font-normal text-sm font-workSans bg-[#f6eff6] p-1">
                POS
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

      {openPinModal && (
        <GeneralModal>
          <InputToken />
        </GeneralModal>
      )}
    </div>
  );
};

export default PosConfirmation;
