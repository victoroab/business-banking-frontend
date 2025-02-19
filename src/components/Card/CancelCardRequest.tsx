import { useAppSelector } from "../../hooks";
import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import PopUp from "../PopUps/PopUp";
import BackNavigation from "../ArrowBack/Back";
import { SuccessIcon } from "../../assets/svg/CustomSVGs";
import { BlockIcon } from "../../assets/svg/Card";
import { useNavigate } from "react-router-dom";

const CancelCardRequest = () => {
  const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  const navigate = useNavigate();
  return (
    <>
      {toggle["cancelCardRequest"] && (
        <PopUp id="cancelCardRequest">
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center px-24 py-16 gap-8 w-[664px] border">
            <BlockIcon />
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Cancel Card Request
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              Are you sure you want to cancel the card request? Please note that
              this action is non-refundable.
            </p>
            <div className="flex flex-col gap-6 w-full">
              <button
                className="red-frame-btn"
                onClick={() => handleShow("cancelCardSuccess")}
              >
                Cancel Card Request
              </button>
              <BackNavigation />
            </div>
          </div>
        </PopUp>
      )}

      {toggle["cancelCardSuccess"] && (
        <PopUp id="cancelCardSuccess">
          <div className="bg-white rounded-lg flex flex-col items-center justify-center px-24 py-20 w-[664px]">
            <div
              className="bg-white p-4 gap-4 rounded-full flex items-center justify-center w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>
            <div className="flex flex-col items-center gap-4 pt-6 pb-10">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Card Request Cancelled
              </h3>
            </div>
            <div className="flex justify-center w-full">
              <button
                className="main-btn w-full"
                onClick={() => navigate("/card")}
              >
                Go Back
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </>
  );
};

export default CancelCardRequest;
