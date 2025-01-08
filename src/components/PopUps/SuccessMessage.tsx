import PopUp from "./PopUp";
import { SuccessIcon } from "../../assets/svg/CustomSVGs";
import { useNavigate } from "react-router-dom";

interface SuccessMessageProps {
  responseMessage: string;
  paragraph: string;
  handleNavigate: () => void;
  auth?: boolean;
}
const SuccessMessage = ({
  responseMessage,
  paragraph,
  handleNavigate,
  auth,
}: SuccessMessageProps) => {
  const navigate = useNavigate();
  return (
    <PopUp id={"success"}>
      <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
        <div
          className="p-4 gap-4 rounded-full items-center justify-center flex w-[122px] h-[122px]"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        >
          <SuccessIcon />
        </div>

        <div className="flex flex-col gap-4 items-center justify-center">
          <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
            {responseMessage}
          </h3>
          <p className="text-greyColr font-workSans leading-6 font-normal text-base text-center w-[470px]">
            {paragraph}
          </p>
        </div>

        <div className="flex justify-center flex-col w-[80%] gap-6">
          <button
            className="main-btn w-full"
            type="submit"
            onClick={handleNavigate}
          >
            Continue To Know Your Business(KYB) Verification
          </button>
          {auth && (
            <button
              className="yellow-frame-btn w-full"
              type="submit"
              onClick={() => navigate("/dashboard")}
            >
              Proceed To Dashboard
            </button>
          )}
        </div>
      </div>
    </PopUp>
  );
};

export default SuccessMessage;
