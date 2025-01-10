import Navbar from "../../../components/Navbar/Navbar";
import BackNavigation from "../../../components/ArrowBack/Back";
import FormInput from "../../../components/FormInput";
// import ProgressLayout from "../../../layout/ProgressLayout";
// import { newTransaction } from "../../../utils";
// import { StepComponentProps } from "../../../interfaces/Global";

const NewBeneficiary = () => {
  //   const stepsComponents: StepComponentProps[] = [
  //     { step: 1, component: DebitAccount },
  //     { step: 2, component: BankDetails },
  //     { step: 3, component: Amount },
  //     { step: 4, component: Confirmation },
  //   ];
  return (
    <>
      <Navbar title="Add Beneficiary" subtitle="" />
      <div className="flex flex-col gap-10">
        <div className="flex justify-start w-48">
          <BackNavigation />
        </div>

        {/* <div className="bg-pryColor-Light w-full flex flex-col gap-10 py-6 px-10 h-[80vh]"> */}
        {/* <ProgressLayout
            stepsComponents={stepsComponents}
            progressSteps={newTransaction}
          /> */}
        {/* MAMAMIA */}
        <div className="bg-pryColor-Light w-full flex flex-col gap-10 py-6 px-10 h-[80vh]">
          <FormInput
            type="text"
            placeholder="Name"
            id="name"
            className="w-[472px]"
          />

          <FormInput
            type="text"
            placeholder="Account Number"
            id="accountNumber"
            className="w-[472px]"
          />

          <FormInput
            type="text"
            placeholder="Bank Name"
            id="bankName"
            className="w-[472px]"
          />

          <button className="main-btn w-[472px] font-bricolage">
            Add Beneficiary
          </button>
        </div>
      </div>
      {/* </div> */}
    </>
  );
};

export default NewBeneficiary;
