import React from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import FormInput from "../../../components/FormInput";
import { CautionIcon, UploadIcon } from "../../../assets/svg/CustomSVGs";

const BusinessDetails: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const handleSubmit = () => {
    setCurrentStep(6);
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center px-14">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Business Details
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Provide your current address for verification and security purposes.
        </p>
      </div>

      <div className="py-6 px-10 gap-4 shadow-sm rounded-md items-center flex w-full ">
        <UploadIcon />
        <div className="flex flex-col gap-2">
          <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
            Upload your business logo
          </p>
          <p className="text-[#8E949A] font-workSans leading-4 font-normal text-sm">
            JPG, PDF, GIF, PNG null:20MB
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-[100%]">
        <FormInput id={""} placeholder="Business Name" />
        <div className="px-6 py-2 -mt-3 gap-4 shadow-sm rounded-md items-center flex w-full">
          <CautionIcon />
          <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
            Use the registered business name on your documents
          </p>
        </div>

        <FormInput id={""} placeholder="Business Industry" />
        <FormInput id={""} placeholder="Company Size" />
        <FormInput id={""} placeholder="Estimated Annual Income" />
      </div>

      <div className="flex justify-center  w-full gap-6">
        <button
          className="main-btn w-full"
          type="submit"
          onClick={handleSubmit}
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default BusinessDetails;
