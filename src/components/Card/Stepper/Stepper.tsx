import "./stepper.css";
import { TiTick } from "react-icons/ti";

interface StepperProps {
  steps: string[];
  currentStep: number;
  complete?: boolean;
}

const Stepper: React.FC<StepperProps> = ({ steps, currentStep, complete }) => {
  return (
    <>
      <div className="flex justify-between">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }`}
          >
            <div className="step">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-sm max-w-[82px] text-center">{step}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Stepper;
