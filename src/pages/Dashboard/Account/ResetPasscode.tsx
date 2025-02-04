import { useState } from "react";
import { toast } from "react-toastify";
import {
  useRequestResetCodeMutation,
  useSetCodeMutation,
  useVerifyResetCodeMutation,
} from "../../../service/auth";
import PopUp from "../../../components/PopUps/PopUp";
import FormInput from "../../../components/FormInput";
import Otp from "../../../components/OTP/Otp";
import Spinner from "../../../components/Spinner/Spinner";
import { ResetEmailIcon } from "../../../assets/svg/dashboard";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import {
  setEmailAddress,
  setExistingVerificationOTP,
} from "../../../store/slice/authSlice";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import { ResetPasswordIcon } from "../../../assets/svg/Accout";
import { selectGlobal } from "../../../store/slice/globalSlice";
import OTPInput from "react-otp-input";

const ResetPasscode = () => {
  const toggle = useAppSelector(selectGlobal);
  const [requestReset, requestMutation] = useRequestResetCodeMutation();
  const [verifyToken, verifyMutation] = useVerifyResetCodeMutation();
  const [email, setEmail] = useState<string>("");
  const [setCode, { isLoading }] = useSetCodeMutation();
  const { handleShow } = useGlobalHooks();
  const [newCode, setNewCode] = useState<string>("");
  const [confirmCode, setConfirmCode] = useState<string>("");
  const [resetOTP, setOpenResetOTP] = useState<boolean>(true);
  const [otpCode, setOtpCode] = useState<string>("");
  const dispatch = useAppDispatch();

  const handleResetPasscode = async () => {
    try {
      const response = await requestReset({
        emailOrAccountNumber: email,
      }).unwrap();

      toast.success(response?.message);
      handleShow("resetOTP");
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
      dispatch(setEmailAddress(email));
      dispatch(setExistingVerificationOTP(otpCode));
      setOpenResetOTP(false);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const handleNewChange = (otp: string) => {
    setNewCode(otp);
  };

  const handleChange = (otp: string) => {
    setConfirmCode(otp);
  };

  const handleSetNewPasscode = async () => {
    try {
      if (newCode !== confirmCode) {
        toast.error("Passcode mismatch");
      } else {
        const requiredExistingData = {
          emailOrAccountNumber: email,
          passcode: newCode,
          confirmPasscode: confirmCode,
          otp: otpCode,
        };
        const response = await setCode(requiredExistingData).unwrap();
        toast.success(response?.message);
        handleShow("resetOTP");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Reset Passcode
        </h3>
      </div>

      <div
        className="py-10 px-28 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <div className="flex flex-col gap-8 w-full">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="rounded-full p-6 w-[138px] h-[138px] bg-[#fdfbf6] flex justify-center items-center">
              <ResetPasswordIcon />
            </div>
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Verify This Request
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-center">
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
              <button className="main-btn w-full" onClick={handleResetPasscode}>
                {requestMutation?.isLoading ? <Spinner /> : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {toggle["resetOTP"] && (
        <PopUp id={"resetOTP"}>
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
                        Please enter the 6-digit OTP sent to your mail. This
                        helps us verify your identity and keep your account
                        secure.
                      </p>
                    }
                  />
                  <div className="flex justify-center  w-full gap-6">
                    <button
                      className="main-btn w-full"
                      onClick={handleVerifyToken}
                    >
                      {verifyMutation?.isLoading ? <Spinner /> : "Submit"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center flex justify-center items-center flex-col w-full mt-20 px-12 gap-8">
                <div className="flex flex-col gap-8 w-full">
                  <div className="flex flex-col gap-4">
                    <h3 className="text-pryColor font-semibold text-2xl text-left font-bricolage leading-6">
                      Reset Passcode
                    </h3>
                    <p className="text-greyColr font-workSans leading-4 text-left font-normal text-sm">
                      Enter your secure passcode to access your account and stay
                      in control of your finances. Quick, simple, and safe.
                    </p>
                  </div>

                  <div className="flex flex-col gap-4 -ml-2">
                    <p className="text-[#23303B] font-workSans leading-4 font-medium text-xl text-left ml-2">
                      Enter New Passcode
                    </p>
                    <OTPInput
                      value={newCode}
                      onChange={handleNewChange}
                      numInputs={6}
                      inputType="password"
                      inputStyle={{
                        maxWidth: "64px",
                        maxHeight: "64px",
                        width: "10vw",
                        height: "8vw",
                        margin: "10px",
                        fontSize: "40px",
                        fontWeight: "bold",
                        borderRadius: 8,
                        backgroundColor: "#f1f1f1",
                        outlineColor: "#0E0C60",
                        minWidth: "55px",
                        minHeight: "60px",
                      }}
                      renderInput={(props) => <input {...props} />}
                    />

                    <p className="text-[#23303B] font-workSans leading-4 font-medium text-xl text-left ml-2">
                      Confirm New Passcode
                    </p>
                    <OTPInput
                      value={confirmCode}
                      onChange={handleChange}
                      numInputs={6}
                      inputType="password"
                      inputStyle={{
                        maxWidth: "64px",
                        maxHeight: "64px",
                        width: "10vw",
                        height: "8vw",
                        margin: "10px",
                        fontSize: "40px",
                        fontWeight: "bold",
                        borderRadius: 8,
                        backgroundColor: "#f1f1f1",
                        outlineColor: "#0E0C60",
                        minWidth: "55px",
                        minHeight: "60px",
                      }}
                      renderInput={(props) => <input {...props} />}
                    />
                  </div>
                </div>

                <div className="flex justify-center  w-full gap-6">
                  <button
                    className="main-btn w-full"
                    type="submit"
                    onClick={handleSetNewPasscode}
                  >
                    {isLoading ? <Spinner /> : "Continue"}
                  </button>
                </div>
              </div>
            )}
          </div>
        </PopUp>
      )}
    </div>
  );
};

export default ResetPasscode;
