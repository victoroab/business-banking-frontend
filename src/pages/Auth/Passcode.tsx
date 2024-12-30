import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { setPasscode } from "../../store/slice/authSlice";

const Passcode = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [otpCode, setOtpCode] = useState<string>("");

  const handleSubmit = () => {
    dispatch(setPasscode(otpCode));
    navigate("/confirm-passcode");
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48 px-14 gap-8">
        <Otp
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          inputCount={6}
          title={"Set Up Your Business Account Passcode"}
          paragraph={
            <p>
              Your passcode will help keep your account safe and allow quick
              <br /> access to your banking app.
            </p>
          }
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

export default Passcode;
