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
import toast from "react-hot-toast";
import Spinner from "../../../components/Spinner/Spinner";
import {
  saveUserInfo,
  selectAuth,
  setKYBDetails,
} from "../../../store/slice/authSlice";
import PopUp from "../../../components/PopUps/PopUp";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { useKybDetailsQuery } from "../../../service/kyb";

const LoginPasscode = () => {
  const [signIn, { isLoading }] = useSignInMutation();
  const [verify, verifyMutation] = useSignInVerifyMutation();
  const toggle = useAppSelector(selectGlobal);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [otpCode, setOtpCode] = useState<string>("");
  const [verifyOtpCode, setVerifyOtpCode] = useState<string>("");
  const { phoneNumber } = useAppSelector(selectAuth);
  const { handleShow } = useGlobalHooks();
  const { data, refetch } = useKybDetailsQuery({});

  const handleSubmit = async () => {
    const requiredData = {
      phoneNumber: phoneNumber as string,
      passcode: otpCode,
    };
    try {
      const response = await signIn(requiredData).unwrap();
      console.log(response);
      toast.success(response?.data?.message);
      handleShow("success");
    } catch (error: any) {
      toast.error(error.data.message);
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
      console.log(response);
      toast.success(response?.message);
      dispatch(saveUserInfo(response?.data));

      if (response?.data?.kyc?.attestation === true) {
        navigate("/dashboard");
      } else {
        refetch();
        dispatch(setKYBDetails(data?.data));
        navigate("/kyb/identify");
      }
    } catch (error: any) {
      toast.error(error.data.message);
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
          <span className="font-bold cursor-pointer text-pryColor">
            {" "}
            Reset Passcode
          </span>
        </p>
      </div>

      {toggle["success"] && (
        <PopUp id={"success"}>
          <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center p-10 gap-10 w-[650px] border">
            <Otp
              otpCode={verifyOtpCode}
              setOtpCode={setVerifyOtpCode}
              inputCount={6}
              title={"Verify This Request"}
              paragraph={
                <p>
                  We sent a 6 digit code to {phoneNumber}. Check your SMS and
                  enter it here.
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
    </AuthLayout>
  );
};

export default LoginPasscode;
