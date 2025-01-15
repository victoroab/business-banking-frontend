import OTPInput from "react-otp-input";
import { useAppSelector } from "../../hooks";
import { useGlobalHooks } from "../../hooks/globalHooks";
import { selectGlobal } from "../../store/slice/globalSlice";
import BackNavigation from "../ArrowBack/Back";
import Otp from "../OTP/Otp";
import PopUp from "../PopUps/PopUp";
import { SuccessIcon } from "../../assets/svg/CustomSVGs";
import { useNavigate } from "react-router-dom";

const ResetVirtualCard = () => {
  const navigate = useNavigate();
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  return (
    <>
      {toggle["inputCardPinReset"] && (
        <PopUp id="inputCardPinReset">
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center px-24 py-16 gap-8 w-[664px] border">
            <Otp
              otpCode={""}
              setOtpCode={() => {}}
              inputCount={4}
              title="Enter Your Transaction PIN"
              paragraph={
                <p>
                  Please input your 4-digit transaction PIN to proceed securely.
                </p>
              }
            />
            <div className="flex flex-col gap-6 w-full">
              <button
                className="main-btn"
                onClick={() => handleShow("resetCardPin")}
              >
                Next
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {toggle["resetCardPin"] && (
        <PopUp id="resetCardPin">
          <div className="bg-white rounded-lg flex flex-col items-center justify-center px-24 py-16 gap-8 w-[664px] border">
            <div className="flex flex-col gap-4">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Reset Card PIN
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                Enter your secure card PIN to continue to use your virtual card
                to pay for online transactions.
              </p>
            </div>
            <div className="flex flex-col gap-4 ml-2">
              <p className="text-[#23303B] font-workSans leading-4 font-medium text-xl text-left ml-2">
                Enter New Card PIN
              </p>
              <OTPInput
                value={""}
                onChange={() => {}}
                numInputs={6}
                inputType="password"
                inputStyle={{
                  maxWidth: "64px",
                  maxHeight: "64px",
                  width: "10vw",
                  height: "8vw",
                  margin: "10px",
                  fontSize: "40px",
                  fontWeight: "bold",
                  borderRadius: 8,
                  backgroundColor: "#f1f1f1",
                  outlineColor: "#0E0C60",
                  minWidth: "55px",
                  minHeight: "60px",
                }}
                renderInput={(props) => <input {...props} />}
              />

              <p className="text-[#23303B] font-workSans leading-4 font-medium text-xl text-left ml-2">
                Confirm New Card PIN
              </p>
              <OTPInput
                value={""}
                onChange={() => {}}
                numInputs={6}
                inputType="password"
                inputStyle={{
                  maxWidth: "64px",
                  maxHeight: "64px",
                  width: "10vw",
                  height: "8vw",
                  margin: "10px",
                  fontSize: "40px",
                  fontWeight: "bold",
                  borderRadius: 8,
                  backgroundColor: "#f1f1f1",
                  outlineColor: "#0E0C60",
                  minWidth: "55px",
                  minHeight: "60px",
                }}
                renderInput={(props) => <input {...props} />}
              />
            </div>
            <div className="flex flex-col gap-6 w-full">
              <button
                className="main-btn"
                onClick={() => handleShow("cardPinResetSuccess")}
              >
                Reset PIN
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {toggle["cardPinResetSuccess"] && (
        <PopUp id="cardPinResetSuccess">
          <div className="bg-pryColor rounded-lg flex flex-col items-center justify-center px-24 py-20 w-[664px]">
            <div
              className="bg-white p-4 gap-4 rounded-full flex items-center justify-center w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>
            <div className="flex flex-col items-center gap-4 pt-6 pb-10">
              <h3 className="text-white font-semibold text-2xl font-bricolage leading-6">
                Card PIN Reset sucessful
              </h3>
              <p className="text-white font-workSans leading-4 text-base text-center">
                Your card PIN has been updated. You can now use your new PIN to
                pay for online transactions securely.
              </p>
            </div>
            <div className="flex justify-center w-full">
              <button
                className="yellow-btn w-full"
                onClick={() => navigate("/cards")}
              >
                Go Back
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default ResetVirtualCard;
