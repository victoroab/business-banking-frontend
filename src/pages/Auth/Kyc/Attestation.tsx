import { useGlobalHooks } from "../../../hooks/globalHooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { useAppSelector } from "../../../hooks";
import PopUp from "../../../components/PopUps/PopUp";
import { CopyIcon, SuccessIcon } from "../../../assets/svg/CustomSVGs";
import { useNavigate } from "react-router-dom";

const Attestation = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const handleSubmit = () => {
    handleShow("submit");
  };
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-6 justify-center items-center px-14">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Attestation
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please review the details below and confirm their accuracy before
          proceeding. By submitting, you acknowledge that the information
          provided is true and correct to the best of your knowledge
        </p>
      </div>

      <div className="p-6 gap-4 shadow-sm rounded-md flex flex-col w-full">
        <div className="grid grid-cols-2 gap-10 w-full">
          <div className="det">
            <p className="tit text-sm text-lightGreyColor">Business Name</p>
            <p className="va">Zara</p>
          </div>
          <div
            className="det
          "
          >
            <p className="tit text-sm text-lightGreyColor">Business Industry</p>
            <p className="va">Fashion</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-10 w-full">
          <div className="det">
            <p className="tit text-sm text-lightGreyColor">Business Address</p>
            <p className="va">132, Herbert Macaulay Way, Yaba, Lagos State</p>
          </div>
          <div className="det">
            <p className="tit text-sm text-lightGreyColor">Business Location</p>
            <p className="va">Nigeria</p>
          </div>
        </div>
        <div className="det">
          <p className="tit text-sm text-lightGreyColor">Business Size</p>
          <p className="va">100 - 500</p>
        </div>
        <div className="det">
          <p className="tit text-sm text-lightGreyColor">
            Estimated Annual Income
          </p>
          <p className="va">NGN 5,000,000 - NGN 10,000,000</p>
        </div>
      </div>

      <div className="p-4 gap-4 shadow-sm rounded-md items-center flex w-full">
        <input type="checkbox" />
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          I Attest that all the information provided above is correct
        </p>
      </div>

      <div className="flex justify-center  w-full gap-6">
        <button
          className="main-btn w-full"
          type="submit"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>

      {toggle["submit"] && (
        <PopUp id={"submit"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            <div className="p-4 gap-4 shadow-sm rounded-full items-center justify-center flex w-[122px] h-[122px]">
              <SuccessIcon />
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Your Business Profile is Ready
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-base text-center">
                Congratulations! Your profile has been successfully created
                <br /> and an account number has been assigned to you.
              </p>
            </div>

            <div className="p-4 gap-4 shadow-sm rounded-md items-center flex w-[80%] justify-between">
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                Account Number:{" "}
                <span className="text-sm font-medium">1234567890</span>
              </p>
              <p className="copy text-xs text-secColor flex items-center gap-2">
                COPY <CopyIcon />
              </p>
            </div>

            <div className="flex justify-center  w-[80%] gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                onClick={() => navigate("/dashboard")}
              >
                Proceed To Dashboard
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default Attestation;
