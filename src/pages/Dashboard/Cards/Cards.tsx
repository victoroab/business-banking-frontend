import { CardsImage } from "../../../assets/svg/CardsImage";
import Navbar from "../../../components/Navbar/Navbar";
import { CardWorksIcon, WebIcon, TransferIcon } from "../../../assets/svg/Card";
import { useNavigate } from "react-router-dom";

const Cards = () => {
  const navigate = useNavigate();
  return (
    <div className="">
      <Navbar
        title="Cards"
        subtitle="Easily apply for a debit or credit card tailored to your needs."
      />
      <div className="bg-pryColor-Light ">
        <div className="flex flex-col items-center justify-center gap-6 bg-white w-[90%] mx-auto px-20 py-11">
          <CardsImage />
          <h1 className="font-bricolage font-semibold text-xl text-[#0E0C60]">
            Dependable and Effective
          </h1>
          <div className="flex flex-col gap-2 border border-dashed border-gray-400 w-[342px] rounded-lg py-4 px-8  text-[#352F36]">
            <p className="text-xs ">What you will get:</p>
            <ul className="flex flex-col gap-2 font-workSans">
              <li className="flex items-center gap-2">
                <CardWorksIcon />A card that works
              </li>
              <li className="flex items-center gap-2">
                <WebIcon />
                Online Payment
              </li>
              <li className="flex items-center gap-2">
                <TransferIcon />
                Seamless Transactions
              </li>
            </ul>
          </div>
          <button
            className="main-btn w-[342px]"
            onClick={() => navigate("/request-card")}
          >
            Request Card
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
