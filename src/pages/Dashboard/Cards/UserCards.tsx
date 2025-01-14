import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import BackNavigation from "../../../components/ArrowBack/Back";
import {
  BlueHorizontalCardImage,
  GreenHorizontalCardImage,
} from "../../../assets/svg/CardsImage";
import { BackwardIcon, ForwardIcon } from "../../../assets/svg/RequestCards";
import { BlockIcon, ResetIcon, RightArrow } from "../../../assets/svg/Card";
import PopUp from "../../../components/PopUps/PopUp";
import Otp from "../../../components/OTP/Otp";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";

const UserCards = () => {
  const navigate = useNavigate();
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const [activeSlide, setActiveSlide] = useState(0); // 0 for physical card, 1 for virtual card

  const handleNextSlide = () => setActiveSlide(1);
  const handlePrevSlide = () => setActiveSlide(0);

  const handleShowDetails = () => {
    if (activeSlide === 0) {
      navigate("/physical-card-details");
    } else {
      navigate("/virtual-card-details");
    }
  };

  return (
    <>
      <Navbar
        title="Cards"
        subtitle="Easily apply for a debit or credit card tailored to your needs."
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-start w-48">
          <BackNavigation />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-center gap-2">
              <div onClick={handlePrevSlide}>
                <BackwardIcon />
              </div>
              <BlueHorizontalCardImage />
              <GreenHorizontalCardImage />
              <BlueHorizontalCardImage />
              <div onClick={handleNextSlide}>
                <ForwardIcon />
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="flex items-center justify-center gap-2">
                <div
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === 0
                      ? "bg-[#0E0C60] w-12"
                      : "bg-[#4F596280] w-4"
                  }`}
                ></div>
                <div
                  className={`h-2 rounded-full transition-all ${
                    activeSlide === 1
                      ? "bg-[#0E0C60] w-12"
                      : "bg-[#4F596280] w-4"
                  }`}
                ></div>
              </div>
              <div
                className={`w-fit py-1 px-[6px] transition-all ${
                  activeSlide === 0
                    ? "bg-[#456EFE0D] text-statusBlue"
                    : "bg-[#25A9690D] text-[#25A969]"
                }`}
              >
                <h2 className="text-xs font-medium text-center font-workSans">
                  {activeSlide === 0 ? "Physical Card" : "Virtual Card"}
                </h2>
              </div>
              <div>
                <button
                  className="main-card-btn"
                  onClick={() => handleShow("createCardPin")}
                >
                  Show Details
                </button>
              </div>
            </div>
          </div>
          <div className="py-8 flex flex-col justify-center items-center gap-6">
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[1012px] mx-auto"
              style={{
                boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-2">
                <BlockIcon />
                Block Card
              </div>
              <RightArrow />
            </div>
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[1012px] mx-auto"
              style={{
                boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
              }}
            >
              <div className="flex items-center gap-2">
                <ResetIcon />
                Reset Card Pin
              </div>
              <RightArrow />
            </div>
          </div>
        </div>
      </div>

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

export default UserCards;
