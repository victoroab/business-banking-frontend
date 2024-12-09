import { useNavigate } from "react-router-dom";
import { BackArrowIcon } from "../../assets/svg/CustomSVGs";

const BackNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center">
      <button
        className="text-secColor text-xl font-semibold text-bricolage flex gap-2 cursor-pointer items-center"
        onClick={() => navigate(-1)}
      >
        {" "}
        <BackArrowIcon />
        Go Back
      </button>
    </div>
  );
};

export default BackNavigation;
