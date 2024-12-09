import React from "react";
import { IDOption, KYCPageProps } from "../../../interfaces/Global";
import { accountOptions } from "../../../utils";
import { ArrowRightIcon } from "../../../assets/svg/CustomSVGs";

const IdVerification: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const handleSubmit = () => {
    setCurrentStep(3);
  };

  const handleNavigate = (title: string) => {
    console.log(title);
  };
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Choose Your ID Type for Verification
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          To keep your account secure and compliant, we need to validate <br />{" "}
          your identity. Please select the type of ID you’d like to use..
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {accountOptions.map((option: IDOption, index) => (
          <div
            className="account-option shadow-sm flex flex-col cursor-pointer rounded-xl p-6 gap-4"
            key={index}
            onClick={() => handleNavigate(option?.title)}
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

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
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

export default IdVerification;
