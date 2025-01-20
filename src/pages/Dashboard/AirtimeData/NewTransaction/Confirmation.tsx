import PopUp from "../../../../components/PopUps/PopUp";
import { SuccessIcon } from "../../../../assets/svg/CustomSVGs";
import { useGlobalHooks } from "../../../../hooks/globalHooks";
import { useAppSelector } from "../../../../hooks";
import { selectGlobal } from "../../../../store/slice/globalSlice";
import { AlertLogoIcon } from "../../../../assets/svg/Sidebar";
import { useRef } from "react";
import { ArrowDownIcon } from "../../../../assets/svg/PayBill";

const AirtimeConfirmation = () => {
  const formRef = useRef<HTMLDivElement>(null);
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);

  const handleSubmit = () => {
    handleShow("submit-bill");
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
          Electricity Package
        </p>

        <h3 className="text-pryColor font-extrabold text-2xl font-bricolage leading-6">
          IKEDC Prepaid
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
          Beneficiary Details
        </p>

        <div className="p-4 gap-4 items-center flex flex-col w-full bg-[#f7f8ff] rounded-xl">
          <div className="grid grid-cols-2 gap-10 w-full">
            <div className="det flex flex-col gap-2">
              <p className="tit text-sm text-greyColr font-workSans">Amount:</p>
              <p className="text-sm text-greyColr font-workSans">IKEDC</p>
            </div>
            <div className="flex flex-col items-end ">
              <p className="tit text-sm  text-secColor font-normal font-workSans cursor-pointer">
                Change
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
                    Bamidele Akinyemi
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
              <p className="tit text-sm  text-secColor font-normal font-workSans cursor-pointer">
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
        <div
          className="flex bg-white rounded-3xl text-pryColor font-bricolage items-center gap-2 fixed bottom-[60px] px-6 py-3 font-semibold right-[320px] cursor-pointer"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
          onClick={scrollToBottom}
        >
          <ArrowDownIcon />
          Scroll Down
        </div>
        <div ref={formRef}></div>
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
                // onClick={() => navigate("/")}
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

export default AirtimeConfirmation;
