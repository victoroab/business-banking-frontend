import React from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import FormInput from "../../../components/FormInput";
import { CautionIcon, UploadIcon } from "../../../assets/svg/CustomSVGs";
import AddDirector from "../../../components/Auth/AddDirector";
import { setKycCurrentStep } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";

const BusinessDetails: React.FC<KYCPageProps> = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setKycCurrentStep(6));
  };
  return (
    <div className="flex flex-col gap-6 justify-center items-center px-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Business Details
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Provide your current address for verification and security purposes.
        </p>
      </div>

      <div
        className="py-6 px-10 gap-4 rounded-md items-center flex w-full"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
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
        <div
          className="px-6 py-2 -mt-3 gap-4 rounded-md items-center flex w-full"
          style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
        >
          <CautionIcon />
          <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
            Use the registered business name on your documents
          </p>
        </div>

        <FormInput id={""} placeholder="Business Industry" />
        <FormInput id={""} placeholder="Company Size" />
        <FormInput id={""} placeholder="Estimated Annual Income" />
      </div>

      <div className="flex flex-col gap-6 mt-2">
        <div className="flex flex-col gap-4">
          <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
            Business Director
          </h3>
          <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
            Provide some information about the directors of your business. You
            can add multiple directors.
          </p>
        </div>

        <AddDirector />
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
