import { IDOption } from "../../../interfaces/Global";
import { accountOptions } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { selectAuth, setKYCIdentityStep } from "../../../store/slice/authSlice";
import BVN from "./Identity/BVN";
import { useNavigate } from "react-router-dom";

const IdVerification = () => {
  const { kycIdentityStep, userInfo } = useAppSelector(selectAuth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleVerify = () => {
    if (userInfo?.kyc?.bvnStatus && !userInfo?.kyc?.ninStatus) {
      dispatch(setKYCIdentityStep("NIN"));
    } else if (userInfo?.kyc?.bvnStatus && userInfo?.kyc?.ninStatus) {
      navigate("/kyb/face-verification");
    } else {
      dispatch(setKYCIdentityStep("BVN"));
    }
  };
  return (
    <>
      {kycIdentityStep === "DEFAULT" ? (
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
                className="account-option flex flex-col rounded-xl p-6 gap-4"
                style={{
                  boxShadow: "0px 1px 7px 5px rgba(216, 216, 216, 0.2)",
                }}
                key={index}
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
            <button
              className="main-btn w-full"
              type="submit"
              onClick={handleVerify}
            >
              {userInfo?.kyc?.bvnStatus && userInfo?.kyc?.ninStatus
                ? "Proceed to Face Verification"
                : "Verify Identity"}
            </button>
          </div>
        </div>
      ) : (
        <BVN />
      )}
    </>
  );
};

export default IdVerification;
