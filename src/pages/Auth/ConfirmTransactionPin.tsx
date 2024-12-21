import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useSetTransactionPinMutation } from "../../service/kyb";
import { selectAuth } from "../../store/slice/authSlice";

const ConfirmTransactionPin = () => {
  const [otpCode, setOtpCode] = useState<string>("");
  const navigate = useNavigate();
  const { transactionPin, phoneNumber } = useAppSelector(selectAuth);
  const [setTransactionPin] = useSetTransactionPinMutation();

  const handleSubmit = async () => {
    try {
      if (transactionPin !== otpCode) {
        toast.error("Transaction Pin mismatch");
      } else {
        const requiredData = {
          phoneNumber: phoneNumber,
          pin: transactionPin,
          confirmPin: otpCode,
        };

        const response = await setTransactionPin(requiredData).unwrap();

        toast.success(response?.message);
        navigate("/kyc");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48">
        <Otp
          inputCount={4}
          setOtpCode={setOtpCode}
          otpCode={otpCode}
          title="Confirm Your Transaction Pin"
          paragraph={
            <p>
              This PIN is to be used to authorize transactions (e.g. transfers,
              <br /> airtime purchases, bill payments, etc.)
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

export default ConfirmTransactionPin;
