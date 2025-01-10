import { useNavigate } from "react-router-dom";
import { YellowCardImage } from "../../../assets/svg/RequestCards";
import BackNavigation from "../../../components/ArrowBack/Back";
import Navbar from "../../../components/Navbar/Navbar";

const RequestCard = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar
        title="Pay Bill"
        subtitle="Settle your bills for utilities, subscriptions, and more—all in one place!"
      />
      <div className="flex flex-col  gap-10">
        <div className="flex  justify-start w-48">
          <BackNavigation />
        </div>

        <div className="bg-pryColor-Light ">
          <div className="flex flex-col items-center justify-center gap-6 bg-white w-[90%] mx-auto px-20 py-11">
            <YellowCardImage />
            <div className="text-center">
              <h1 className="font-bricolage font-semibold text-xl text-[#0E0C60]">
                Request Your Physical Card Today
              </h1>
              <p className="font-workSans">
                Withdraw from ATMs, pay on POS machines and pay online.
              </p>
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
              onClick={() => navigate("/request-card")}
            >
              Get A Physical Card
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestCard;
