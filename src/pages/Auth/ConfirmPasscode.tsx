import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { saveUserInfo, selectAuth } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSetPasscodeMutation } from "../../service/auth";

const ConfirmPasscode = () => {
  const [otpCode, setOtpCode] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { passcode, phoneNumber } = useAppSelector(selectAuth);
  const [setPasscode] = useSetPasscodeMutation();

  const handleSubmit = async () => {
    try {
      if (passcode !== otpCode) {
        toast.error("Passcode mismatch");
      } else {
        const requiredData = {
          phoneNumber: phoneNumber,
          passcode: passcode,
          confirmPasscode: otpCode,
        };

        const response = await setPasscode(requiredData).unwrap();

        dispatch(saveUserInfo(response.data));
        toast.success(response?.message);
        navigate("/transaction-pin");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48">
        <Otp
          inputCount={6}
          title={"Confirm Business Account Passcode"}
          paragraph={
            <p>
              Your passcode will help keep your account safe and allow quick
              <br /> access to your banking app.
            </p>
          }
          setOtpCode={setOtpCode}
          otpCode={otpCode}
        />

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
    </AuthLayout>
  );
};

export default ConfirmPasscode;
