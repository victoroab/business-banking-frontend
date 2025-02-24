import { YellowCardImage } from "../../assets/svg/RequestCards";
import BackNavigation from "../ArrowBack/Back";
// import PopUp from "../PopUps/PopUp";
import { useAppSelector } from "../../hooks";
import { selectCard } from "../../store/slice/cardSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import { useState } from "react";
import GeneralModal from "../PopUps/GeneralModal";
import InputToken from "../../pages/Dashboard/Cards/InputToken";

const CardIssuance = () => {
  const { handleShow } = useGlobalHooks();
  const { requestCardPayload } = useAppSelector(selectCard);
  const [openPinModal, setOpenPinModal] = useState(false);
  console.log(requestCardPayload, "sdfsdf");
  const handleConfirm = () => {
    setOpenPinModal(true);
    handleShow("card-issuance");
  };
  return (
    <GeneralModal>
      {openPinModal ? (
        <InputToken />
      ) : (
        <div className="bg-white rounded-lg flex flex-col py-6 px-20 gap-6 w-[650px] font-workSans">
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
                <span>{requestCardPayload?.deliveryOption}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery Address</span>
                <span className="w-[100px] text-end">
                  {requestCardPayload?.address
                    ? requestCardPayload?.address
                    : requestCardPayload?.pickupBranch}
                </span>
              </div>
            </div>
          </div>
          <div
            className="flex flex-col gap-1 text-sm w-[362px] mx-auto rounded-md px-4 py-6"
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
          <button className="main-btn w-[472px]" onClick={handleConfirm}>
            Confirm
          </button>
          <div className="flex justify-center">
            <BackNavigation />
          </div>
        </div>
      )}
    </GeneralModal>
  );
};

export default CardIssuance;
