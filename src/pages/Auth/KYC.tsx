import { useState } from "react";
import { KBrandIcon } from "../../assets/svg/Alert";
import { progressSteps } from "../../utils";
import { ProgressStepsProps } from "../../interfaces/Global";
import Nationality from "./Kyc/Nationality";
import IdVerification from "./Kyc/IdVerification";
import FaceVerification from "./Kyc/FaceRecognition";
import BusinessDetails from "./Kyc/BusinessDetails";
import ResidentialAddress from "./Kyc/ResidentialAddress";
import Attestation from "./Kyc/Attestation";
import BusinessAddress from "./Kyc/BusinessAddress";
import BusinessDocument from "./Kyc/BusinessDocument";

const KYC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  return (
    <div className="bg-pryColor-Light w-full border flex flex-col gap-10 justify-center items-center py-6 px-32 h-screen">
      <KBrandIcon />
      <div className="border px-24 py-14 bg-white w-full flex relative h-[80vh]">
        <div className="w-1/2 flex flex-col gap-10 fixed">
          {progressSteps.map((progress: ProgressStepsProps) => (
            <div className="flex" key={progress.id}>
              <div
                className={`w-[200px] items-center gap-2 border-b-2 flex pb-2 ${
                  currentStep === progress.id
                    ? "border-secColor"
                    : "border-[#e8e9eb]"
                }`}
              >
                <div
                  className={`rounded-full  px-1 w-[18px] h-[18px] flex items-center justify-center ${
                    currentStep === progress.id
                      ? "bg-secColor text-white"
                      : "bg-[#e8e9eb]"
                  }`}
                >
                  <p className="text-sm">{progress.id}</p>
                </div>

                <p className="id font-workSans font-normal">{progress.title}</p>
              </div>
            </div>
          ))}
        </div>
        <div className=" w-1/2 overflow-y-auto ml-[50%] h-full">
          {currentStep === 1 && <Nationality setCurrentStep={setCurrentStep} />}
          {currentStep === 2 && (
            <IdVerification setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 3 && (
            <FaceVerification setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 4 && (
            <ResidentialAddress setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 5 && (
            <BusinessDetails setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 6 && (
            <BusinessDocument setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 7 && (
            <BusinessAddress setCurrentStep={setCurrentStep} />
          )}
          {currentStep === 8 && <Attestation />}
        </div>
      </div>
    </div>
  );
};

export default KYC;
