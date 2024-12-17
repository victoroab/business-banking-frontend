import { useState } from "react";
import {
  ProgressProps,
  ProgressStepsProps,
  StepComponentProps,
} from "../interfaces/Global";

const ProgressLayout = ({ stepsComponents, progressSteps }: ProgressProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="border px-24 py-14 bg-white w-full flex relative h-[80vh]">
      <div className="w-[30%] flex flex-col gap-10 fixed">
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
                className={`rounded-full px-1 w-[18px] h-[18px] flex items-center justify-center ${
                  currentStep === progress.id
                    ? "bg-secColor text-white"
                    : "bg-[#e8e9eb]"
                }`}
              >
                <p className="text-sm">{progress.id}</p>
              </div>
              <p className="font-workSans font-normal">{progress.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="w-[65%] overflow-y-auto ml-[50%] h-full px-6">
        {stepsComponents.map(
          ({ step, component: Component }: StepComponentProps) =>
            currentStep === step ? (
              <Component key={step} setCurrentStep={setCurrentStep} />
            ) : null
        )}
      </div>
    </div>
  );
};

export default ProgressLayout;
