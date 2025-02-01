import StepBackNavigation from "../../../../components/ArrowBack/StepBackArrow";
import Navbar from "../../../../components/Navbar/Navbar";
import { useAppSelector } from "../../../../hooks";
import { StepComponentProps } from "../../../../interfaces/Global";
import ProgressLayout from "../../../../layout/ProgressLayout";
import {
  selectBillPayment,
  setAirtimeDataCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
import { airtimeStep, dataStep } from "../../../../utils";
import AddBeneficiary from "./AddBeneficiary";
import Amount from "./Amount";
import AirtimeConfirmation from "./Confirmation";
import DebitAccount from "./DebitAccount";
import AirtimePackage from "./Package";
import Provider from "./Provider";

const NewAirtimeData = () => {
  const { airtimeDataAction, airtimeDataCurrentStep } =
    useAppSelector(selectBillPayment);

  const airtimeStepsComponents: StepComponentProps[] = [
    { step: 1, component: DebitAccount },
    { step: 2, component: Amount },
    { step: 3, component: Provider },
    { step: 4, component: AddBeneficiary },
    { step: 5, component: AirtimeConfirmation },
  ];

  const dataStepsComponents: StepComponentProps[] = [
    { step: 1, component: DebitAccount },
    { step: 2, component: Provider },
    { step: 3, component: AirtimePackage },
    { step: 4, component: AddBeneficiary },
    { step: 5, component: AirtimeConfirmation },
  ];

  const stepsComponents =
    airtimeDataAction === "AIRTIME"
      ? airtimeStepsComponents
      : dataStepsComponents;
  const progressSteps =
    airtimeDataAction === "AIRTIME" ? airtimeStep : dataStep;
  return (
    <>
      <Navbar
        title="Pay Bill"
        subtitle="Settle your bills for utilities, subscriptions, and more—all in one place!"
      />
      <div className="flex flex-col  gap-10">
        <div className="flex  justify-start w-48">
          <StepBackNavigation
            stateCurrentStep={airtimeDataCurrentStep}
            setStateCurrentStep={setAirtimeDataCurrentStep}
          />
        </div>

        <div className="bg-pryColor-Light w-full flex flex-col gap-10 justify-center items-center py-6 px-10 h-[80vh]">
          <ProgressLayout
            stepsComponents={stepsComponents}
            progressSteps={progressSteps}
            isDashboard
            stateCurrentStep={airtimeDataCurrentStep}
            setStateCurrentStep={setAirtimeDataCurrentStep}
          />
        </div>
      </div>
    </>
  );
};

export default NewAirtimeData;
