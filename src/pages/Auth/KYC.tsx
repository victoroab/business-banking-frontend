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
import {
  setKycCurrentStep,
  setUserProfileDetails,
} from "../../store/slice/authSlice";
import { useKybDetailsQuery } from "../../service/kyb";
import { useEffect } from "react";
import { useAppDispatch } from "../../hooks";

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
  const { data } = useKybDetailsQuery({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setUserProfileDetails(data?.data));
  }, [data]);
  console.log(data);
  return (
    <div className="bg-pryColor-Light w-full border flex flex-col gap-10 justify-center items-center py-6 px-32 h-screen">
      <KBrandIcon />
      <ProgressLayout
        stepsComponents={stepsComponents}
        progressSteps={KYCProgressSteps}
        updateProgressStep={setKycCurrentStep}
      />
    </div>
  );
};

export default KYC;
