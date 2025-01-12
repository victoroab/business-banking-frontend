import { useNavigate } from "react-router-dom";
import { BlockIcon, ResetIcon, RightArrow } from "../../../assets/svg/Card";
import { GreenHorizontalCardImage } from "../../../assets/svg/CardsImage";
import { CopyIcon } from "../../../assets/svg/CustomSVGs";
import BackNavigation from "../../../components/ArrowBack/Back";
import Navbar from "../../../components/Navbar/Navbar";
import BlockVirtualCard from "../../../components/Card/BlockVirtualCard";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import ResetVirtualCard from "../../../components/Card/ResetVirtualCard";

const VirtualCardDetails = () => {
  const navigate = useNavigate();
  const { handleShow } = useGlobalHooks();
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
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-10">
            <div className="flex items-center justify-center gap-12 w-[1012px] mx-auto font-workSans">
              <GreenHorizontalCardImage />
              <div
                className="flex-1 flex flex-col rounded-xl py-5 px-5"
                style={{
                  boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="flex items-center justify-between border-dashed border rounded-lg py-3 px-20 border-lightGreyColor">
                  <div className="flex flex-col">
                    <span className="text-xs">Card Number</span>
                    <span className="font-medium">1234 5678 9901 2343</span>
                  </div>
                  <div className="flex items-center gap-2">
                    COPY <CopyIcon />
                  </div>
                </div>
                <div className="flex flex-col mt-4 gap-4">
                  <div className="w-full flex justify-between gap-3">
                    <div className="flex-1 flex items-center justify-center border-dashed border rounded-lg py-3 px-4 border-lightGreyColor">
                      <div className="flex flex-col items-center">
                        <span className="text-xs">Expiry Date</span>
                        <span className="font-medium">11/27</span>
                      </div>
                    </div>
                    <div className="flex-1 flex items-center justify-center border-dashed border rounded-lg py-3 px-4 border-lightGreyColor">
                      <div className="flex flex-col items-center">
                        <span className="text-xs">CVV</span>
                        <span className="font-medium">123</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
              <div
                className={`w-fit py-1 px-[6px] transition-all bg-[#25A9690D] text-[#25A969]`}
              >
                <h2 className="text-xs font-medium text-center font-workSans">
                  Virtual Card
                </h2>
              </div>
              <div>
                <button
                  className="main-card-btn"
                  onClick={() => navigate("/cards")}
                >
                  Hide Details
                </button>
              </div>
            </div>
          </div>
          <div className="py-8 flex flex-col justify-center items-center gap-6">
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[1012px] mx-auto"
              onClick={() => handleShow("inputCardPinBlock")}
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
            <BlockVirtualCard />
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[1012px] mx-auto"
              onClick={() => handleShow("inputCardPinReset")}
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
            <ResetVirtualCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default VirtualCardDetails;
