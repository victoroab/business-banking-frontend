import ProgressLayout from "../../../layout/ProgressLayout";
import { StepComponentProps } from "../../../interfaces/Global";
import { newBillProgressSteps } from "../../../utils";
import DebitAccount from "./NewBill/DebitAccount";
import Navbar from "../../../components/Navbar/Navbar";
import BackNavigation from "../../../components/ArrowBack/Back";
import Category from "./NewBill/Category";

const NewBill = () => {
  const stepsComponents: StepComponentProps[] = [
    { step: 1, component: DebitAccount },
    { step: 2, component: Category },
    // { step: 3, component: FaceVerification },
    // { step: 4, component: ResidentialAddress },
    // { step: 5, component: BusinessDetails },
    // { step: 6, component: BusinessDocument },
    // { step: 7, component: BusinessAddress },
    // { step: 8, component: Attestation },
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
