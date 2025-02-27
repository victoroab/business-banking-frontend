import ProgressLayout from "../../../../layout/ProgressLayout";
import { StepComponentProps } from "../../../../interfaces/Global";
import { newPosSteps } from "../../../../utils";
import Navbar from "../../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../../hooks";
import StepBackNavigation from "../../../../components/ArrowBack/StepBackArrow";
import PosDebitAccount from "./PosDebitAccount";
import DeviceType from "./DeviceType";
import Details from "./Details";
import DeliveryOption from "./DeliveryOption";
import PosConfirmation from "./PosConfirmation";
import { selectPOS, setPosCurrentStep } from "../../../../store/slice/posSlice";

const NewPOS = () => {
  const { posCurrentStep } = useAppSelector(selectPOS);
  const stepsComponents: StepComponentProps[] = [
    { step: 1, component: PosDebitAccount },
    { step: 2, component: DeviceType },
    { step: 3, component: Details },
    { step: 4, component: DeliveryOption },
    { step: 5, component: PosConfirmation },
  ];

  return (
    <>
      <Navbar title="POS" subtitle="Here's your your POS Terminals" />
      <div className="flex flex-col  gap-10">
        <div className="flex  justify-start w-48">
          <StepBackNavigation
            stateCurrentStep={posCurrentStep}
            setStateCurrentStep={setPosCurrentStep}
          />
        </div>

        <div className="bg-pryColor-Light w-full flex flex-col gap-10 justify-center items-center py-6 px-10 h-[80vh]">
          <ProgressLayout
            stepsComponents={stepsComponents}
            progressSteps={newPosSteps}
            isDashboard
            stateCurrentStep={posCurrentStep}
            setStateCurrentStep={setPosCurrentStep}
          />
        </div>
      </div>
    </>
  );
};

export default NewPOS;
