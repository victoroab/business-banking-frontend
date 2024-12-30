import {
  CameraIcon,
  GlassesIcon,
  LightIcon,
} from "../../../assets/svg/CustomSVGs";
import { setKycCurrentStep } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";

const FaceVerification = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setKycCurrentStep(4));
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center ">
      <div className="rounded-full p-6 w-[138px] h-[138px] bg-[#fdfbf6] flex justify-center items-center">
        <CameraIcon />
      </div>
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Verify Your Identity with a Photo
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-center">
          We need to match your face with your provided information to
          <br /> ensure your account’s security. Please follow the guidelines
          below <br />
          for a successful capture.
        </p>
      </div>

      <div className="border-dashed p-6 bg-pryColor-Light flex flex-col border gap-4 rounded-xl w-[100%]">
        <div className="flex gap-4 items-center">
          <LightIcon />
          <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
            Make sure you are in a brightly lit space
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <GlassesIcon />
          <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
            Take off glasses, hats, face masks, or any coverings that obscure
            your face
          </p>
        </div>
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
    </div>
  );
};

export default FaceVerification;
