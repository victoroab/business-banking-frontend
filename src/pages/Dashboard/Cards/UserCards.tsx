import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/Navbar/Navbar";
import BackNavigation from "../../../components/ArrowBack/Back";
import { BackwardIcon, ForwardIcon } from "../../../assets/svg/RequestCards";
import {
  AddCard,
  BlockIcon,
  ResetIcon,
  RightArrow,
  TrackCard,
} from "../../../assets/svg/Card";

import { useGlobalHooks } from "../../../hooks/globalHooks";
// import { useAppSelector } from "../../../hooks";
// import { selectGlobal } from "../../../store/slice/globalSlice";
import Card from "../../../components/Card/ATMCard";
import UserCardPin from "../../../components/Card/UserCardPin";

const UserCards = () => {
  const navigate = useNavigate();

  const { handleShow } = useGlobalHooks();
  const [activeSlide, setActiveSlide] = useState(0); // 0 for physical card, 1 for virtual card

  const handleNextSlide = () => setActiveSlide(1);
  const handlePrevSlide = () => setActiveSlide(0);

  const physicalCardNumber = "1234567812345678";
  const virtualCardNumber = "8765432187654321";

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
              <Card type="physical" cardNumber={physicalCardNumber} />
              <Card type="virtual" cardNumber={virtualCardNumber} />
              {/* New Add Card Div */}
              <div
                style={{
                  width: "300px",
                  height: "169px",
                  border: "2px solid #DBB950",
                }}
                className="flex justify-center items-center rounded-[10px]"
              >
                <div
                  className="flex flex-col gap-0.5 items-center cursor-pointer"
                  onClick={() => navigate("/request-card")}
                >
                  <AddCard />
                  <span className="font-workSans text-xs">Add Card</span>
                </div>
              </div>
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
          <div className="py-8 mt-10 flex flex-col justify-center items-center gap-6">
            {activeSlide === 0 && (
              <div
                className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[1012px] mx-auto"
                style={{
                  boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="flex items-center gap-2">
                  <TrackCard />
                  Track Card
                </div>
                <RightArrow />
              </div>
            )}
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

      <UserCardPin activeSlide={activeSlide} />
    </>
  );
};

export default UserCards;
