import { useState } from "react";
import Otp from "./OTP/Otp";
import Spinner from "./Spinner/Spinner";
import PopUp from "./PopUps/PopUp";
import { errorHandler } from "../utils";
import { useVerifyCodeMutation } from "../service/security";
import { useGlobalHooks } from "../hooks/globalHooks";
import { FAIcon } from "../assets/svg/dashboard";
import { toast } from "react-toastify";

const Verify2FA = ({ secret }: { secret?: string }) => {
  const [otpCode, setOtpCode] = useState<string>("");
  const { handleShow } = useGlobalHooks();
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();

  const handleSubmit = async () => {
    try {
      const requiredData = {
        secret: secret as string,
        token: otpCode,
      };
      const response = await verifyCode(requiredData).unwrap();
      handleShow("verify-2fa-code");
      toast.success(response?.message);
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return (
    <PopUp id={"verify-2fa-code"}>
      <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
        <FAIcon />
        <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center px-10 py-6 gap-10 w-[650px]">
          <Otp
            inputCount={6}
            title={"Two-Factor Authentication"}
            setOtpCode={setOtpCode}
            otpCode={otpCode}
            paragraph={
              <p>
                Please enter the 6-digit code from your Google Authenticator
                app.
              </p>
            }
          />
          <div className="flex justify-center  w-full gap-6">
            <button className="main-btn w-full" onClick={handleSubmit}>
              {isLoading ? <Spinner /> : "Continue"}
            </button>
          </div>
        </div>
      </div>
    </PopUp>
  );
};

export default Verify2FA;
