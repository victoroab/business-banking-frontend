import { YellowCardImage } from "../../assets/svg/RequestCards";
import BackNavigation from "../ArrowBack/Back";
import PopUp from "../PopUps/PopUp";

const CardIssuance = () => {
  return (
    <PopUp id={"card-issuance"}>
      <div className="bg-white rounded-lg flex flex-col py-10 px-20 gap-10 w-[650px] font-workSans">
        <div className="flex flex-col w-full items-center justify-center gap-4">
          <YellowCardImage />
          <div className="flex flex-col items-center justify-center gap-2">
            <p>Card Issuance Fee</p>
            <p className="text-pryColor font-bold text-xl leading-6">
              ₦1,000.00
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[362px] mx-auto">
          <span>Delivery Details</span>
          <div
            className="flex flex-col gap-6 text-sm w-[362px] mx-auto rounded-md px-4 py-6"
            style={{ boxShadow: "0px 1px 5px 0px #0000000A" }}
          >
            <div className="flex justify-between">
              <span>Delivery Option</span>
              <span>Home Delivery</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Delivery Address</span>
              <span className="w-[100px]">
                123, Herbert Macaulay, Yaba, Lagos state, 101234
              </span>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col gap-2 text-sm w-[362px] mx-auto rounded-md px-4 py-6"
          style={{ boxShadow: "0px 1px 5px 0px #0000000A" }}
        >
          <div className="flex justify-between">
            <span>Card Price</span>
            <span>₦1,000.00</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Fee</span>
            <span>₦1,000.00</span>
          </div>
          <div className="flex justify-between mt-2 border-t border-lightGreyColor pt-3">
            <span>Total Debit</span>
            <span className="font-bold">₦2,000.00</span>
          </div>
          <span>*Payment for card is non-refundable</span>
        </div>
        <button className="main-btn w-[472px]">Confirm</button>
        <div className="flex justify-center">
          <BackNavigation />
        </div>
      </div>
    </PopUp>
  );
};

export default CardIssuance;
