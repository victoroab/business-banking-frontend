import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { saveUserInfo, selectAuth } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  useSetExistingPasscodeMutation,
  useSetPasscodeMutation,
} from "../../service/auth";
import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import Spinner from "../../components/Spinner/Spinner";
import SuccessMessage from "../../components/PopUps/SuccessMessage";

const ConfirmPasscode = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const [otpCode, setOtpCode] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { passcode, phoneNumber, verificationOTP } = useAppSelector(selectAuth);
  const [setPasscode, newMutation] = useSetPasscodeMutation();
  const [setExistingPasscode, existingMutation] =
    useSetExistingPasscodeMutation();
  const [responseMessage, setResponseMessage] = useState("");
  const { havePersonalAccount } = useAppSelector(selectGlobal);

  const isLoading = havePersonalAccount
    ? existingMutation?.isLoading
    : newMutation?.isLoading;
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
        const requiredExistingData = {
          accountNumber: phoneNumber,
          passcode: passcode,
          confirmPasscode: otpCode,
          otp: verificationOTP,
        };
        const response = havePersonalAccount
          ? await setExistingPasscode(requiredExistingData).unwrap()
          : await setPasscode(requiredData).unwrap();

        dispatch(saveUserInfo(response.data));
        setResponseMessage(response?.message);
        handleShow("success");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };
  const handleNavigate = () => {
    navigate("/transaction-pin");
  };
  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48 gap-8 px-14">
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
            " Your Passcode is set and ready to use. You’re now one step closer to secure and seamless transactions. Remember to keep your Passcode private and safe"
          }
        />
      )}
    </AuthLayout>
  );
};

export default ConfirmPasscode;
