import React from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import FormInput from "../../../components/FormInput";

const Nationality: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const handleSubmit = () => {
    setCurrentStep(2);
  };
  return (
    <div className="flex flex-col gap-10 pr-20">
      <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
        Nationality
      </h3>

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
          <FormInput
            id={""}
            placeholder="Nigeria"
            label="Country"
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

export default Nationality;
