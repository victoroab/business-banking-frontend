import { useNavigate } from "react-router-dom";
import {
  BlockIcon,
  ResetIcon,
  RightArrow,
  TrackCard,
} from "../../../assets/svg/Card";
import { CopyIcon } from "../../../assets/svg/CustomSVGs";
import BackNavigation from "../../../components/ArrowBack/Back";
import Navbar from "../../../components/Navbar/Navbar";
import BlockPhysicalCard from "../../../components/Card/BlockPhysicalCard";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import Card from "../../../components/Card/ATMCard";

const PhysicalCardDetails = () => {
  const navigate = useNavigate();
  const { handleShow } = useGlobalHooks();
  const physicalCardNumber = "1234567812345678";
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
              <Card type="physical" cardNumber={physicalCardNumber} />
              <div
                className="flex-1 flex flex-col rounded-xl py-5 px-5"
                style={{
                  boxShadow: "0px 0px 40px 0px rgba(0, 0, 0, 0.04)",
                }}
              >
                <div className="flex items-center justify-between border-dashed border rounded-lg py-3 px-20 border-lightGreyColor">
                  <div className="flex flex-col">
                    <span className="text-xs">Card Number</span>
                    <span className="font-medium">
                      {physicalCardNumber.replace(/(\d{4})/g, "$1 ").trim()}
                    </span>
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
                className={`w-fit py-1 px-[6px] transition-all bg-[#456EFE0D] text-statusBlue`}
              >
                <h2 className="text-xs font-medium text-center font-workSans">
                  Physical Card
                </h2>
              </div>
              <div>
                <button
                  className="main-card-btn"
                  onClick={() => navigate("/card")}
                >
                  Hide Details
                </button>
              </div>
            </div>
          </div>
          <div className="py-8 flex flex-col justify-center items-center gap-6">
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[1012px] mx-auto cursor-pointer"
              onClick={() => navigate("/track-card")}
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
            <div
              className="bg-white rounded-xl flex items-center justify-between py-6 px-6 w-[1012px] mx-auto cursor-pointer"
              onClick={() => handleShow("inputCardPinBlockPhysical")}
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
            <BlockPhysicalCard />
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
    </>
  );
};

export default PhysicalCardDetails;
