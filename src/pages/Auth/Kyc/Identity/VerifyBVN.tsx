import { useState } from "react";
import PopUp from "../../../../components/PopUps/PopUp";
import Otp from "../../../../components/OTP/Otp";
import Spinner from "../../../../components/Spinner/Spinner";
import { toast } from "react-toastify";
import { errorHandler } from "../../../../utils";
import { useGlobalHooks } from "../../../../hooks/globalHooks";
import { useVerfifyBVNMutation } from "../../../../service/kyb";
import { setKYCIdentityStep } from "../../../../store/slice/authSlice";
import { useAppDispatch } from "../../../../hooks";

const VerifyBVN = ({ bvn }: { bvn: string }) => {
  const [otpCode, setOtpCode] = useState<string>("");
  const { handleShow } = useGlobalHooks();
  const [verifyBVN, { isLoading }] = useVerfifyBVNMutation();
  const dispatch = useAppDispatch();
  const handleVerifyToken = async () => {
    try {
      const response = await verifyBVN({
        bvn: bvn,
        otp: otpCode,
      }).unwrap();
      toast.success(response?.message);
      console.log(response);
      handleShow("verify-bvn");
      dispatch(setKYCIdentityStep("NIN"));
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return (
    <div>
      <PopUp id={"verify-bvn"}>
        <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
          <div className="flex flex-col w-full gap-10 justify-center text-center items-center">
            <Otp
              inputCount={6}
              title={"Verify Your BVN"}
              setOtpCode={setOtpCode}
              otpCode={otpCode}
              paragraph={
                <p>
                  We sent a 6 digit code to your mail. Check your mail and enter
                  it here.
                </p>
              }
            />
            <div className="flex justify-center  w-full gap-6">
              <button className="main-btn w-full" onClick={handleVerifyToken}>
                {isLoading ? <Spinner /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </PopUp>
    </div>
  );
};

export default VerifyBVN;
