import { useState } from "react";
import { IDOption } from "../../../interfaces/Global";
import { accountOptions } from "../../../utils";
import IdentityDetails from "./Identity/IdentityDetails";
import { useAppSelector } from "../../../hooks";
import { selectGlobal } from "../../../store/slice/globalSlice";
import NIN from "./Identity/NIN";
import BVN from "./Identity/BVN";

const IdVerification = () => {
  const [itentityType, setIdentityType] = useState<string>("default");
  const { havePersonalAccount } = useAppSelector(selectGlobal);

  const handleNavigate = (title: string) => {
    setIdentityType(title);
  };

  return (
    <>
      {itentityType === "default" && (
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-4">
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Provide These IDs For Verification
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
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center  w-full gap-6">
            <button className="main-btn w-full" type="submit">
              Verify Identity
            </button>
          </div>
        </div>
      )}

      {(itentityType === "NIN" || itentityType === "BVN") && (
        <>
          {havePersonalAccount ? (
            <IdentityDetails identityType={itentityType} /> // to fetch either nin or bvn details
          ) : (
            <>{itentityType === "NIN" ? <NIN /> : <BVN />}</>
          )}
        </>
      )}
    </>
  );
};

export default IdVerification;
