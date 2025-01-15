import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { selectGlobal } from "../../store/slice/globalSlice";
import BackNavigation from "../ArrowBack/Back";
import Otp from "../OTP/Otp";
import PopUp from "../PopUps/PopUp";

const UserCardPin = ({ activeSlide }: { activeSlide: number }) => {
  const navigate = useNavigate();
  const toggle = useAppSelector(selectGlobal);
  const handleShowDetails = () => {
    if (activeSlide === 0) {
      navigate("/physical-card-details");
    } else {
      navigate("/virtual-card-details");
    }
  };
  return (
    <>
      {/* Show OTP Pop-Up when user clicks "Show Details" */}
      {toggle["createCardPin"] && (
        <PopUp id="createCardPin">
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
                onClick={() => {
                  handleShowDetails();
                }}
              >
                Next
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default UserCardPin;
