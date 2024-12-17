import { KBrandIcon } from "../../assets/svg/Alert";

import { StepComponentProps } from "../../interfaces/Global";
import Nationality from "./Kyc/Nationality";
import IdVerification from "./Kyc/IdVerification";
import FaceVerification from "./Kyc/FaceRecognition";
import BusinessDetails from "./Kyc/BusinessDetails";
import ResidentialAddress from "./Kyc/ResidentialAddress";
import Attestation from "./Kyc/Attestation";
import BusinessAddress from "./Kyc/BusinessAddress";
import BusinessDocument from "./Kyc/BusinessDocument";
import ProgressLayout from "../../layout/ProgressLayout";
import { KYCProgressSteps } from "../../utils";

const stepsComponents: StepComponentProps[] = [
  { step: 1, component: Nationality },
  { step: 2, component: IdVerification },
  { step: 3, component: FaceVerification },
  { step: 4, component: ResidentialAddress },
  { step: 5, component: BusinessDetails },
  { step: 6, component: BusinessDocument },
  { step: 7, component: BusinessAddress },
  { step: 8, component: Attestation },
];

const KYC = () => {
  return (
    <div className="bg-pryColor-Light w-full border flex flex-col gap-10 justify-center items-center py-6 px-32 h-screen">
      <KBrandIcon />
      <ProgressLayout
        stepsComponents={stepsComponents}
        progressSteps={KYCProgressSteps}
      />
    </div>
  );
};

export default KYC;
