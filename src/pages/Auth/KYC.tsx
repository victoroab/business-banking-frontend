import { KBrandIcon } from "../../assets/svg/Alert";

import ProgressLayout from "../../layout/ProgressLayout";
import { KYCProgressSteps } from "../../utils";
import { useLocation } from "react-router-dom";

const KYC = () => {
  const location = useLocation();
  const currentStep = parseInt(location.pathname.split("/")[1], 10) || 1;
  console.log(currentStep, "current");

  return (
    <div className="bg-pryColor-Light w-full border flex flex-col gap-10 justify-center items-center py-6 px-32 h-screen">
      <KBrandIcon />
      <ProgressLayout progressSteps={KYCProgressSteps} isDashboard />
    </div>
  );
};

export default KYC;
