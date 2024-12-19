import React from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { AlertLogoIcon } from "../../../assets/svg/Sidebar";
import PopUp from "../../../components/PopUps/PopUp";
import { SuccessIcon } from "../../../assets/svg/CustomSVGs";

const Confirmation: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);

  const handleSubmit = () => {
    handleShow("submit-bill");
  };

  return (
    <div className="flex flex-col gap-10 pr-6 ">
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
          #50,000.00
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
                    Bamidele Akinyemi
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-normal flex gap-2 items-center text-sm">
                    Account Number:
                    <span className="text-sm font-medium">1234567890</span>
                  </p>
                  <p className="text-greyColr font-workSans leading-4 font-normal gap-2 flex items-center text-sm">
                    Bank Name:
                    <span className="text-sm font-medium">AlertMFB</span>
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex flex-col justify-end items-end
          "
            >
              <p className="tit text-sm  text-secColor font-normal font-workSans cursor-pointer">
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

      {toggle["submit-bill"] && (
        <PopUp id={"submit-bill"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            <div
              className="p-4 gap-4 rounded-full items-center justify-center flex w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Bet wallet Funded Successfully
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-base text-center">
                Your wallet has been funded successfully
              </p>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center border-t pt-6">
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-center">
                TV Package
              </p>
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                DSTV Yanga NGN 5,000
              </h3>

              <p className="text-greyColr font-workSans leading-4 font-normal text-base text-center">
                Add Beneficiary ?
              </p>
            </div>
            <div className="flex justify-center  w-full gap-6">
              <button
                className="yellow-frame-btn w-1/2"
                type="submit"
                // onClick={() => navigate("/signup")}
              >
                Share Receipt
              </button>
              <button
                className="main-btn w-1/2"
                type="submit"
                // onClick={() => navigate("/signup")}
              >
                Download Receipt
              </button>
            </div>
            <div className="flex justify-center  w-[80%] gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                // onClick={() => navigate("/dashboard")}
              >
                Download Receipt
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Confirmation;
