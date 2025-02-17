import ProgressLayout from "../../../layout/ProgressLayout";
import { StepComponentProps } from "../../../interfaces/Global";
import {
  billProgressSteps,
  cableProgressSteps,
  electricityProgressSteps,
  // newBillProgressSteps,
} from "../../../utils";
import DebitAccount from "./NewBill/DebitAccount";
import Navbar from "../../../components/Navbar/Navbar";
import Category from "./NewBill/Category";
import { useSelector } from "react-redux";
import ElectricityProvider from "./NewBill/Electricity/Provider";
import CableProvider from "./NewBill/CableTV/Provider";
import BettingProvider from "./NewBill/Betting/Provider";
import Package from "./NewBill/Electricity/Package";
import AddBeneficiary from "./NewBill/Electricity/AddBeneficiary";
import Amount from "./NewBill/Amount";
import Confirmation from "./NewBill/Electricity/Confirmation";
import {
  selectBillPayment,
  setBillpaymentCurrentStep,
} from "../../../store/slice/billPaymentSlice";
import { useAppSelector } from "../../../hooks";
import StepBackNavigation from "../../../components/ArrowBack/StepBackArrow";
import { selectDashboard } from "../../../store/slice/dashboardSlice";
import CablePackage from "./NewBill/CableTV/Package";
import CableBeneficiary from "./NewBill/CableTV/AddBeneficiary";
import CableConfirmation from "./NewBill/CableTV/Confirmation";

const NewBill = () => {
  const { billCategory } = useSelector(selectDashboard);
  const { billpaymentCurrentStep } = useAppSelector(selectBillPayment);

  const Provider =
    billCategory === "Electricity"
      ? ElectricityProvider
      : billCategory === "Cable TV"
      ? CableProvider
      : BettingProvider;

  const plan = billCategory === "Electricity" ? Package : CablePackage;
  const beneficiary =
    billCategory === "Electricity" ? AddBeneficiary : CableBeneficiary;
  const confirmation =
    billCategory === "Electricity" ? Confirmation : CableConfirmation;
  const stepsComponents: StepComponentProps[] = [
    { step: 1, component: DebitAccount },
    { step: 2, component: Category },
    { step: 3, component: Provider },
    { step: 4, component: plan },
    { step: 5, component: beneficiary },
    { step: 6, component: Amount },
    { step: 7, component: confirmation },
  ];

  // const progressSteps =
  //   billCategory === "Electricity"
  //     ? electricityProgressSteps
  //     : cableProgressSteps;

  return (
    <>
      <Navbar
        title="Pay Bill"
        subtitle="Settle your bills for utilities, subscriptions, and more—all in one place!"
      />
      <div className="flex flex-col  gap-10">
        <div className="flex  justify-start w-48">
          <StepBackNavigation
            stateCurrentStep={billpaymentCurrentStep}
            setStateCurrentStep={setBillpaymentCurrentStep}
          />
        </div>

        <div className="bg-pryColor-Light w-full flex flex-col gap-10 justify-center items-center py-6 px-10 h-[80vh]">
          <ProgressLayout
            stepsComponents={stepsComponents}
            progressSteps={billProgressSteps}
            isDashboard
            stateCurrentStep={billpaymentCurrentStep}
            setStateCurrentStep={setBillpaymentCurrentStep}
          />
        </div>
      </div>
    </>
  );
};

export default NewBill;
