import ProgressLayout from "../../../layout/ProgressLayout";
import { StepComponentProps } from "../../../interfaces/Global";
import { newTransaction } from "../../../utils";

import Navbar from "../../../components/Navbar/Navbar";
import BackNavigation from "../../../components/ArrowBack/Back";
import DebitAccount from "./DebitAccount";
import BankDetails from "./BankDetails";
import Amount from "./Amount";
import Confirmation from "./Confirmation";

const NewTransaction = () => {
  const stepsComponents: StepComponentProps[] = [
    { step: 1, component: DebitAccount },
    { step: 2, component: BankDetails },
    { step: 3, component: Amount },
    { step: 4, component: Confirmation },
  ];

  return (
    <>
      <Navbar
        title="Send Money"
        subtitle="Sending money has never been easier. ."
      />
      <div className="flex flex-col  gap-10">
        <div className="flex  justify-start w-48">
          <BackNavigation />
        </div>

        <div className="bg-pryColor-Light w-full flex flex-col gap-10 justify-center items-center py-6 px-10 h-[80vh]">
          <ProgressLayout
            stepsComponents={stepsComponents}
            progressSteps={newTransaction}
          />
        </div>
      </div>
    </>
  );
};

export default NewTransaction;