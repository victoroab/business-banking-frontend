import React from "react";
import { KYCPageProps } from "../../../../interfaces/Global";

const IdentityDetails: React.FC<KYCPageProps & { identityType: string }> = ({
  setCurrentStep,
  identityType,
}) => {
  const handleConfirmation = () => {
    setCurrentStep(3);
  };

  return (
    <div className="flex flex-col gap-4 px-4 justify-center items-center">
      <div className="flex flex-col gap-4 justify-center items-center w-[70%]">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Is this {identityType} Yours?
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Confirm the {identityType} shown below belongs to you.
        </p>
      </div>

      <div className="image">
        <img
          src={"https://via.placeholder.com/50"}
          alt="Uploaded Preview"
          className="w-12 h-12 rounded-full mr-4"
        />
      </div>

      <div
        className="py-6 p-20 gap-2 rounded-md justify-center items-center flex flex-col w-[70%]"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
          Bamidele Akinyemi
        </p>
        <p className="text-greyColr font-workSans leading-4 font-medium text-sm">
          09131683009
        </p>
      </div>

      <div className="border-dashed p-2 justify-center items-center flex flex-col border rounded-md w-[70%]">
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Bank Verification Number(BVN)
        </p>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          1234567890
        </p>
      </div>
      <div className="flex justify-center px-14 w-full gap-6">
        <button
          className="red-frame-btn w-1/2 font-bricolage"
          type="submit"
          onClick={handleConfirmation}
        >
          No, It Isn't
        </button>
        <button
          className="main-btn w-1/2 font-bricolage"
          type="submit"
          onClick={handleConfirmation}
        >
          Yes, It's Mine
        </button>
      </div>
    </div>
  );
};

export default IdentityDetails;
