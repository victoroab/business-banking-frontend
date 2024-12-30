import ProgressLayout from "../../../layout/ProgressLayout";
import { StepComponentProps } from "../../../interfaces/Global";
import { newBillProgressSteps } from "../../../utils";
import DebitAccount from "./NewBill/DebitAccount";
import Navbar from "../../../components/Navbar/Navbar";
import BackNavigation from "../../../components/ArrowBack/Back";
import Category from "./NewBill/Category";
import { useSelector } from "react-redux";
import { selectGlobal } from "../../../store/slice/globalSlice";
import ElectricityProvider from "./NewBill/Electricity/Provider";
import CableProvider from "./NewBill/CableTV/Provider";
import BettingProvider from "./NewBill/Betting/Provider";
import Package from "./NewBill/Electricity/Package";
import AddBeneficiary from "./NewBill/AddBeneficiary";
import Amount from "./NewBill/Amount";
import Confirmation from "./NewBill/Confirmation";

const NewBill = () => {
  const { billCategory } = useSelector(selectGlobal);



  const Provider =
    billCategory === "Electricity"
      ? ElectricityProvider
      : billCategory === "Cable TV"
      ? CableProvider
      : BettingProvider;

  const stepsComponents: StepComponentProps[] = [
    { step: 1, component: DebitAccount },
    { step: 2, component: Category },
    { step: 3, component: Provider },
    { step: 4, component: Package },
    { step: 5, component: AddBeneficiary },
    { step: 6, component: Amount },
    { step: 7, component: Confirmation },
  ];

  return (
    <>
      <Navbar
        title="Pay Bill"
        subtitle="Settle your bills for utilities, subscriptions, and more—all in one place!"
      />
      <div className="flex flex-col  gap-10">
        <div className="flex  justify-start w-48">
          <BackNavigation />
        </div>

        <div className="bg-pryColor-Light w-full flex flex-col gap-10 justify-center items-center py-6 px-10 h-[80vh]">
          <ProgressLayout
            stepsComponents={stepsComponents}
            progressSteps={newBillProgressSteps}
          />
        </div>
      </div>
    </>
  );
};

export default NewBill;
