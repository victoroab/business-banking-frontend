import AuthLayout from "../../../layout/AuthLayout";
import Otp from "../../../components/OTP/Otp";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { useNavigate } from "react-router-dom";
import {
  useSignInMutation,
  useSignInVerifyMutation,
} from "../../../service/auth";
import { selectGlobal } from "../../../store/slice/globalSlice";
import { toast } from "react-toastify";
import Spinner from "../../../components/Spinner/Spinner";
import {
  saveUserInfo,
  selectAuth,
  setKYBDetails,
} from "../../../store/slice/authSlice";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useGetKybDetailsMutation } from "../../../service/kyb";
import ResetPasscode from "./ResetPasscode";
import PopUp from "../../../components/PopUps/PopUp";
import { errorHandler } from "../../../utils";
import { useCookies } from "../../../hooks/cookiesHook";
import { FAIcon } from "../../../assets/svg/dashboard";
import { EmailOtp } from "../../../assets/svg/Auth";

const LoginPasscode = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const [verify, verifyMutation] = useSignInVerifyMutation();
  const toggle = useAppSelector(selectGlobal);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [otpCode, setOtpCode] = useState<string>("");
  const [verifyOtpCode, setVerifyOtpCode] = useState<string>("");
  const [loginResponse, setLoginResponse] = useState<any>();
  const { phoneNumber } = useAppSelector(selectAuth);
  const { handleShow } = useGlobalHooks();
  const [kybDetails] = useGetKybDetailsMutation();
  const { setCookies } = useCookies();

  const handleSubmit = async () => {
    const requiredData = {
      phoneNumber: phoneNumber as string,
      passcode: otpCode,
    };
    try {
      const response = await signIn(requiredData).unwrap();
      toast.success(response?.data?.message);
      setLoginResponse(response?.data);
      handleShow("login-success");
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  const handleLogin = async () => {
    const requiredData = {
      phoneNumber: phoneNumber as string,
      passcode: otpCode,
      otp: verifyOtpCode,
    };
    try {
      const response = await verify(requiredData).unwrap();
      toast.success(response?.message);
      dispatch(saveUserInfo(response?.data));
      setCookies("businessUserToken", response?.data?.access_token);
      handleShow("login-success");
      const KYBresponse = await kybDetails().unwrap();
      dispatch(setKYBDetails(KYBresponse?.data));
      navigate("/");
    } catch (error: unknown) {
      errorHandler(error);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48 px-8 gap-8">
        <Otp
          otpCode={otpCode}
          setOtpCode={setOtpCode}
          inputCount={6}
          title={"Enter Passcode"}
          paragraph={
            <p>
              Enter your secure passcode to access your account and stay in{" "}
              <br /> control of your finances. Quick, simple, and safe.
            </p>
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
          Forgot Passcode?{" "}
          <span
            className="font-bold cursor-pointer text-pryColor"
            onClick={() => handleShow("resetPasscode")}
          >
            {" "}
            Reset Passcode
          </span>
        </p>
      </div>

      {toggle["login-success"] && (
        <PopUp id={"login-success"}>
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center p-10 gap-10 w-[650px]">
            {loginResponse?.twoFaEnabled ||
            (loginResponse?.otpEnabled && phoneNumber.length === 11) ? (
              <FAIcon />
            ) : (
              <EmailOtp />
            )}
            <Otp
              otpCode={verifyOtpCode}
              setOtpCode={setVerifyOtpCode}
              inputCount={6}
              title={
                loginResponse?.twoFaEnabled
                  ? "Two-Factor Authentication"
                  : loginResponse?.otpEnabled && phoneNumber.length === 11
                  ? `Check Your Phone`
                  : `Check Your Email`
              }
              paragraph={
                <p>
                  {loginResponse?.twoFaEnabled
                    ? "Please enter the 6-digit code from your Google Authenticator app."
                    : loginResponse?.otpEnabled && phoneNumber.length === 11
                    ? `We sent a 6-digit code to ${phoneNumber}. Check your SMS and enter it here.`
                    : `We sent a 6-digit code to ${phoneNumber}. Check your mail and enter it here.`}
                </p>
              }
            />

            <div className="flex justify-center  w-full gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                onClick={handleLogin}
              >
                {verifyMutation?.isLoading ? (
                  <Spinner />
                ) : (
                  "Proceed to Dashboard"
                )}
              </button>
            </div>
          </div>
        </PopUp>
      )}

      {toggle["resetPasscode"] && <ResetPasscode />}
    </AuthLayout>
  );
};

export default LoginPasscode;
