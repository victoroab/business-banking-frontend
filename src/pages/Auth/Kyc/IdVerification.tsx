import React, { useState } from "react";
import { IDOption, KYCPageProps } from "../../../interfaces/Global";
import { accountOptions } from "../../../utils";
import { ArrowRightIcon } from "../../../assets/svg/CustomSVGs";

const IdVerification: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const [screen, setScreen] = useState<string>("default");

  const handleNavigate = (title: string) => {
    setCurrentStep(2);
    setScreen(title);
  };

  const handleConfirmation = () => {
    setCurrentStep(3);
  };

  return (
    <>
      {screen === "default" && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Choose Your ID Type for Verification
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              To keep your account secure and compliant, we need to validate{" "}
              <br /> your identity. Please select the type of ID you’d like to
              use..
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {accountOptions.map((option: IDOption, index) => (
              <div
                className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
                style={{
                  boxShadow: "0px 1px 7px 5px rgba(216, 216, 216, 0.2)",
                }}
                key={index}
                onClick={() => handleNavigate(option?.shortCode as string)}
              >
                <div
                  className="flex items-center justify-center w-[40px] h-[40px] p-2 rounded-sm"
                  style={{ backgroundColor: option?.iconBg }}
                >
                  {<option.icon />}
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                    {option?.title}
                  </h2>
                  <ArrowRightIcon />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(screen === "NIN" || screen === "BVN") && (
        <div className="flex flex-col gap-4 px-4 justify-center items-center">
          <div className="flex flex-col gap-4 justify-center items-center w-[70%]">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Is this {screen} Yours?
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
              Confirm the {screen} shown below belongs to you.
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
      )}
    </>
  );
};

export default IdVerification;
