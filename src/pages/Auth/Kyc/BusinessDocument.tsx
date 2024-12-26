import React from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import ImageUpload from "../../../components/Upload/ImageUpload";
import { setKycCurrentStep } from "../../../store/slice/authSlice";
import { useAppDispatch } from "../../../hooks";

const BusinessDocument: React.FC<KYCPageProps> = () => {
  const dispatch = useAppDispatch();

  const handleSubmit = () => {
    dispatch(setKycCurrentStep(7));
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center px-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Business Document
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Provide your current address for verification and security purposes.
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full px-4">
        <ImageUpload title="CAC Certificate of your business" required />
        <ImageUpload title="Memorandum of Incorporation" required />
        <ImageUpload title="SCUML Document" required />
        <ImageUpload
          title="Utility Bill (Valid bill within the last 90 datys)"
          required
        />
      </div>
      <div className="flex justify-center w-full gap-6">
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

export default BusinessDocument;
