import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { setTransactionPin } from "../../store/slice/authSlice";
import { useAppDispatch } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TransactionPin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [otpCode, setOtpCode] = useState<string>("");

  const handleSubmit = () => {
    dispatch(setTransactionPin(otpCode));
    navigate("/confirm-transaction-pin");
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48 gap-8 px-8">
        <Otp
          inputCount={4}
          title="Create Your Transaction Pin"
          paragraph={
            <p>
              This PIN is to be used to authorize transactions (e.g. transfers,
              <br /> airtime purchases, bill payments, etc.)
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

export default TransactionPin;
