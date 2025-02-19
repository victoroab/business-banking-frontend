import { useNavigate } from "react-router-dom";
import { ForwardIcon, YellowCardImage } from "../../../assets/svg/RequestCards";
import BackNavigation from "../../../components/ArrowBack/Back";
import Navbar from "../../../components/Navbar/Navbar";
import { useState } from "react";

const RequestCard = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0); // 0 for physical card, 1 for virtual card

  const handleNextSlide = () => {
    setActiveSlide(1);
    navigate("/virtual-card");
  };
  return (
    <>
      <Navbar
        title="Cards"
        subtitle="Easily apply for a debit or credit card tailored to your needs."
      />
      <div className="flex flex-col  gap-10">
        <div className="flex justify-start w-48">
          <BackNavigation />
        </div>

        <div className="bg-pryColor-Light ">
          <div className="flex items-center justify-center gap-8 bg-white w-[90%] mx-auto px-20 py-20">
            <div className="flex flex-col items-center justify-center gap-6">
              <YellowCardImage />
              <div className="flex flex-col gap-2 text-center">
                <h1 className="font-bricolage font-semibold text-xl text-[#0E0C60]">
                  Request Your Physical Card Today
                </h1>
                <p className="font-workSans">
                  Withdraw from ATMs, pay on POS machines and pay online.
                </p>
                <div className="flex items-center gap-2 w-full justify-center my-2">
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
              </div>

              <div className="flex flex-col gap-4  shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-[362px] rounded-[12px] py-6 px-8 text-[#352F36]">
                <div className="text-sm font-semibold">
                  <div className="flex justify-between">
                    <span>Card Price</span>
                    <span>₦1,000.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee</span>
                    <span>₦0.00</span>
                  </div>
                  <div className="flex justify-between mt-2 border-t border-gray-300 pt-3">
                    <span>Total Debit</span>
                    <span className="font-bold">₦1,000.00</span>
                  </div>
                </div>
              </div>
              <button
                className="main-btn w-[362px]"
                onClick={() => navigate("/request-physical-card")}
              >
                Get A Physical Card
              </button>
            </div>
            <div
              className="w-48 hover:scale-105 transition-transform"
              onClick={handleNextSlide}
            >
              <ForwardIcon />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestCard;
