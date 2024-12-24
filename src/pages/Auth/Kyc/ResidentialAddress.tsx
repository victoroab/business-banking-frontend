import FormInput from "../../../components/FormInput";
import { setKycCurrentStep } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";

const ResidentialAddress = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setKycCurrentStep(5));
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center px-14">
      <div className="flex flex-col gap-4 justify-center items-center">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Residential Address
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-center">
          Provide your current address for verification and security purposes.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-[100%]">
        <FormInput id={""} placeholder="Enter your address" />
        <FormInput id={""} placeholder="City" />
        <FormInput id={""} placeholder="State" />
        <FormInput id={""} placeholder="Zip Code" />
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

export default ResidentialAddress;
