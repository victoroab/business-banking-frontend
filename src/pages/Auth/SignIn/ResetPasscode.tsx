import { useState } from "react";
import { toast } from "react-toastify";
import {
  useRequestResetCodeMutation,
  useVerifyResetCodeMutation,
} from "../../../service/auth";

import PopUp from "../../../components/PopUps/PopUp";

import FormInput from "../../../components/FormInput";
import { RequestIcon } from "../../../assets/svg/Auth";
import Otp from "../../../components/OTP/Otp";
import Spinner from "../../../components/Spinner/Spinner";
import { ResetEmailIcon } from "../../../assets/svg/dashboard";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../hooks";
import {
  setEmailAddress,
  setExistingVerificationOTP,
} from "../../../store/slice/authSlice";

const ResetPasscode = () => {
  const [requestReset, requestMutation] = useRequestResetCodeMutation();
  const [verifyToken, verifyMutation] = useVerifyResetCodeMutation();
  const [email, setEmail] = useState<string>("");
  const [resetOTP, setOpenResetOTP] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleResetPasscode = async () => {
    try {
      const response = await requestReset({
        emailOrAccountNumber: email,
      }).unwrap();

      toast.success(response?.message);
      // handleShow("resetPasscode");
      setOpenResetOTP(true);
      console.log(response);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleVerifyToken = async () => {
    try {
      const response = await verifyToken({
        emailOrAccountNumber: email,
        otp: otpCode,
      }).unwrap();

      toast.success(response?.message);
      // handleShow("resetPasscode");
      dispatch(setEmailAddress(email));
      dispatch(setExistingVerificationOTP(otpCode));
      setOpenResetOTP(false);
      navigate("/reset-passcode");
      console.log(response);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <PopUp id={"resetPasscode"}>
      <div className="bg-white rounded-lg flex flex-col text-center items-center justify-center p-20 gap-6 w-[650px] border">
        {resetOTP ? (
          <>
            <ResetEmailIcon />

            <div className="flex flex-col w-full gap-10">
              <Otp
                inputCount={6}
                title={"Check Your Mail"}
                setOtpCode={setOtpCode}
                otpCode={otpCode}
                paragraph={
                  <p>
                    Please enter the 6-digit OTP sent to your mail. This helps
                    us verify your identity and keep your account secure.
                  </p>
                }
              />
              <div className="flex justify-center  w-full gap-6">
                <button className="main-btn w-full" onClick={handleVerifyToken}>
                  {verifyMutation?.isLoading ? <Spinner /> : "Submit"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {" "}
            <RequestIcon />
            <div className="flex flex-col gap-4">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Verify This Request
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                To reset your passcode, we need to verify your request first.
                Enter your email adress and a code will be sent to your mail.
              </p>
            </div>
            <div className="flex flex-col w-full gap-10">
              <FormInput
                id={""}
                placeholder="Email address"
                name="email"
                onChange={(e: any) => setEmail(e.target.value)}
              />
              <div className="flex justify-center  w-full gap-6">
                <button
                  className="main-btn w-full"
                  onClick={handleResetPasscode}
                >
                  {requestMutation?.isLoading ? <Spinner /> : "Submit"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </PopUp>
  );
};

export default ResetPasscode;
