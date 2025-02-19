import PopUp from "../PopUps/PopUp";
import BackNavigation from "../ArrowBack/Back";
import Otp from "../OTP/Otp";
import { useAppSelector } from "../../hooks";
import { useGlobalHooks } from "../../hooks/globalHooks";
import { selectGlobal } from "../../store/slice/globalSlice";
import { BlockIcon } from "../../assets/svg/Card";
import { SuccessIcon } from "../../assets/svg/CustomSVGs";
import { useNavigate } from "react-router-dom";
const BlockPhysicalCard = () => {
  const navigate = useNavigate();
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  return (
    <>
      {/* Show OTP Pop-Up when user clicks "Show Details" */}
      {toggle["inputCardPinBlockPhysical"] && (
        <PopUp id="inputCardPinBlockPhysical">
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
                onClick={() => handleShow("blockPhysicalCard")}
              >
                Next
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {toggle["blockPhysicalCard"] && (
        <PopUp id="blockPhysicalCard">
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center px-24 py-16 gap-8 w-[664px] border">
            <div className="flex flex-col gap-4">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Block Physical Card
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                Click on the toggle to block this card.
              </p>
            </div>
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[342px] mx-auto"
              style={{
                boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-2">
                <BlockIcon />
                <div className="flex flex-col items-start gap-2 font-workSans">
                  <span className="">Block Card</span>
                  <span className="text-xs">Temporarily disable this card</span>
                </div>
              </div>
              <div
                className="relative"
                onClick={() => {
                  handleShow("cardBlockSuccessful");
                }}
                style={{
                  width: "40px",
                  height: "20px",
                  borderRadius: "20px",
                  backgroundColor: "#DBB950",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <div
                  className="bg-white rounded-full"
                  style={{
                    width: "16px",
                    height: "16px",
                    transition: "transform 0.3s ease",
                    transform: "translateX(10px)", // Toggle this based on the switch state
                  }}
                />
              </div>
            </div>

            <div className="flex border-dashed border rounded-lg px-8 py-4 border-lightGreyColor w-[342px] mx-auto font-workSans">
              <div className="flex flex-col gap-1 items-start">
                <span className="text-sm">Blocking your card will stop</span>
                <div className="flex items-center gap-4">
                  <BlockIcon />
                  ATM Withdrawal
                </div>
                <div className="flex items-center gap-4">
                  <BlockIcon />
                  POS Payment
                </div>
              </div>
            </div>

            <BackNavigation />
          </div>
        </PopUp>
      )}

      {toggle["cardBlockSuccessful"] && (
        <PopUp id="cardBlockSuccessful">
          <div className="bg-pryColor rounded-lg flex flex-col items-center justify-center px-24 py-20 w-[664px]">
            <div
              className="bg-white p-4 gap-4 rounded-full flex items-center justify-center w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>
            <div className="flex flex-col items-center gap-4 pt-6 pb-10">
              <h3 className="text-white font-semibold text-2xl font-bricolage leading-6">
                Card Successfully blocked
              </h3>
              <p className="text-white font-workSans leading-4 text-base text-center">
                Your card has been blocked successfully for your security. What
                this means is that transactions on this card are now disabled.
                <br />
                You’re protected from unauthorized use.
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

export default BlockPhysicalCard;
