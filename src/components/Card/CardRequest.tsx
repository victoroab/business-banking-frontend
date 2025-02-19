import PopUp from "../PopUps/PopUp";
import Otp from "../OTP/Otp";
import BackNavigation from "../ArrowBack/Back";
import { SuccessIcon } from "../../assets/svg/CustomSVGs";
import { useAppSelector } from "../../hooks";
import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";

const CardRequest = () => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  return (
    <div className="flex flex-col gap-10 pr-6">
      {toggle["otpVerification"] && (
        <PopUp id="otpVerification">
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center p-10 gap-8 w-[664px] border">
            <Otp
              otpCode={""} // Use state for otpCode
              setOtpCode={() => {}} // Handle OTP input
              inputCount={4}
              title="Enter Your Transaction PIN"
              paragraph={
                <p>
                  Please enter your 4-digit transaction PIN to proceed securely.
                </p>
              }
            />
            <div className="flex flex-col items-center justify-center w-full gap-6">
              <button
                className="main-btn w-[472px]"
                onClick={() => handleShow("cardRequestSuccessful")}
              >
                Next
              </button>
              <div className="flex justify-center">
                <BackNavigation />
              </div>
            </div>
          </div>
        </PopUp>
      )}

      {toggle["cardRequestSuccessful"] && (
        <PopUp id="cardRequestSuccessful">
          <div className="bg-pryColor rounded-lg flex flex-col items-center justify-center px-24 py-20 w-[664px]">
            <div
              className="bg-white p-4 gap-4 rounded-full flex items-center justify-center w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>
            <div className="flex flex-col items-center gap-4 pt-6 pb-10">
              <h3 className="text-white font-semibold text-2xl font-bricolage leading-6">
                Card Request Successful
              </h3>
              <p className="text-white font-workSans leading-4 text-base text-center">
                Your card request has been processed. You will be notified via
                mail when your card is ready for pickup.
              </p>
            </div>
            <div className="w-full flex flex-col items-center justify-center border-t border-lightGreyColor py-10">
              <h4 className="text-white">Card Price</h4>
              <p className="text-secColor font-bold text-2xl"> ₦1,000.00</p>
            </div>
            <div className="flex justify-center w-full gap-6 pb-6">
              <button className="yellow-frame-outline-btn w-1/2">
                Share Receipt
              </button>
              <button className="yellow-btn w-1/2">Download Receipt</button>
            </div>
            <div className="flex justify-center w-full">
              <button className="yellow-frame-outline-btn w-full border border-secColor">
                Go To Dashboard
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default CardRequest;
