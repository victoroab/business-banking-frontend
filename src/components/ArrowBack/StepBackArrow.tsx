import { BackArrowIcon } from "../../assets/svg/CustomSVGs";
import { useAppDispatch } from "../../hooks";
import { BackArrowProps } from "../../interfaces/Global";

const StepBackNavigation = ({
  setStateCurrentStep,
  stateCurrentStep,
}: BackArrowProps) => {
  const dispatch = useAppDispatch();
  return (
    <div className="flex w-full justify-center">
      <button
        className="text-secColor text-xl font-semibold text-bricolage flex gap-2 cursor-pointer items-center"
        onClick={() => dispatch(setStateCurrentStep(stateCurrentStep - 1))}
      >
        {" "}
        <BackArrowIcon />
        Go Back
      </button>
    </div>
  );
};

export default StepBackNavigation;
