import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks";
import { useSetTransactionPinMutation } from "../../service/kyb";
import { selectAuth } from "../../store/slice/authSlice";
import Spinner from "../../components/Spinner/Spinner";
import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import SuccessMessage from "../../components/PopUps/SuccessMessage";

const ConfirmTransactionPin = () => {
  const { handleShow } = useGlobalHooks();
  const [otpCode, setOtpCode] = useState<string>("");
  const toggle = useAppSelector(selectGlobal);
  const navigate = useNavigate();
  const { transactionPin } = useAppSelector(selectAuth);
  const { havePersonalAccount } = useAppSelector(selectGlobal);
  const [setTransactionPin, { isLoading }] = useSetTransactionPinMutation();
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async () => {
    try {
      if (transactionPin !== otpCode) {
        toast.error("Transaction Pin mismatch");
      } else {
        const requiredData = {
          pin: transactionPin,
          confirmPin: otpCode,
        };

        const response = await setTransactionPin(requiredData).unwrap();

        setResponseMessage(response?.message);
        handleShow("success");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const handleNavigate = () => {
    navigate(`${havePersonalAccount === true ? "/kyc" : "/profile"}`);
  };
  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48 px-14 gap-8">
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
          <button className="main-btn w-full" onClick={handleSubmit}>
            {isLoading ? <Spinner /> : "Continue"}
          </button>
        </div>
      </div>

      {toggle["success"] && (
        <SuccessMessage
          handleNavigate={handleNavigate}
          responseMessage={responseMessage}
          paragraph={
            " Your PIN is set and ready to use. You’re now one step closer to secure and seamless transactions. Remember to keep your PIN private and safe"
          }
        />
      )}
    </AuthLayout>
  );
};

export default ConfirmTransactionPin;
