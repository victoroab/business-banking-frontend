import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { useState } from "react";
import {
  useVerfifyExistingAccountMutation,
  useVerfifyPhoneMutation,
} from "../../service/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectGlobal } from "../../store/slice/globalSlice";
import {
  selectAuth,
  setExistingVerificationOTP,
} from "../../store/slice/authSlice";
import Spinner from "../../components/Spinner/Spinner";
import { isEmail } from "../../utils";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState<string>("");
  const [verifyPhone, phoneMutation] = useVerfifyPhoneMutation();
  const [verifyAccount, accountMutation] = useVerfifyExistingAccountMutation();
  const { havePersonalAccount } = useAppSelector(selectGlobal);
  const { phoneNumber } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const isLoading = havePersonalAccount
    ? accountMutation?.isLoading
    : phoneMutation?.isLoading;

  const handleSubmit = async () => {
    const requiredData = {
      phoneNumber: phoneNumber,
      otp: otpCode,
    };

    const requiredExistingData = {
      accountNumber: phoneNumber,
      otp: otpCode,
    };

    try {
      const response = havePersonalAccount
        ? await verifyAccount(requiredExistingData).unwrap()
        : await verifyPhone(requiredData);

      toast.success(response?.data?.message || response?.message);
      havePersonalAccount && dispatch(setExistingVerificationOTP(otpCode));
      navigate(`${havePersonalAccount === true ? "/passcode" : "/profile"}`);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center gap-8 items-center flex-col w-full mt-48 px-6 ">
        <Otp
          inputCount={6}
          title={
            isEmail(phoneNumber)
              ? "Verify Your Email Address"
              : "Verify Your Phone Number"
          }
          setOtpCode={setOtpCode}
          otpCode={otpCode}
          paragraph={
            isEmail(phoneNumber) ? (
              <p>
                We sent a 6 digit code to {phoneNumber}. Check your Email and
                enter it here.
              </p>
            ) : (
              <p>
                We sent a 6 digit code to {phoneNumber}. Check your SMS and
                enter it here.
              </p>
            )
          }
        />
        <div className="flex justify-center  w-full gap-6">
          <button
            className="main-btn w-full"
            type="submit"
            onClick={handleSubmit}
          >
            {isLoading ? <Spinner /> : "Continue"}
          </button>
        </div>

        <p className="text-lightGreyColor font-workSans leading-4 font-normal text-[13px]">
          Didn’t get the code?{" "}
          <span className="font-bold cursor-pointer text-pryColor">
            {" "}
            Resend Code
          </span>
        </p>
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
