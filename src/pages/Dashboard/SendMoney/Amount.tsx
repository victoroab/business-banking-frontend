import React from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import FormInput from "../../../components/FormInput";

const Amount: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const handleSubmit = () => {
    setCurrentStep(4);
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Amount
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please input how much electricity you wish to purchase
        </p>
      </div>

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
          <FormInput
            id={""}
            placeholder="Amount"
            className="flex flex-col gap-4"
          />

          <div className="flex justify-center  w-full gap-6">
            <button
              className="main-btn w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Amount;
