import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { saveUserInfo, selectAuth } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSetPasscodeMutation } from "../../service/auth";
import { selectGlobal } from "../../store/slice/globalSlice";
import { useGlobalHooks } from "../../hooks/globalHooks";
import { SuccessIcon } from "../../assets/svg/CustomSVGs";
import PopUp from "../../components/PopUps/PopUp";
import Spinner from "../../components/Spinner/Spinner";

const ConfirmPasscode = () => {
  const { handleShow } = useGlobalHooks();
  const toggle = useAppSelector(selectGlobal);
  const [otpCode, setOtpCode] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { passcode, phoneNumber } = useAppSelector(selectAuth);
  const [setPasscode, { isLoading }] = useSetPasscodeMutation();
  const [responseMessage, setResponseMessage] = useState("");

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

        const response = await setPasscode(requiredData).unwrap();

        dispatch(saveUserInfo(response.data));
        setResponseMessage(response?.message);
        handleShow("success");
      }
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48 gap-8 px-8">
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
        <PopUp id={"success"}>
          <div className="bg-white rounded-lg flex flex-col items-center justify-center p-10 gap-10 w-[650px]">
            <div
              className="p-4 gap-4 rounded-full items-center justify-center flex w-[122px] h-[122px]"
              style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            >
              <SuccessIcon />
            </div>

            <div className="flex flex-col gap-4 items-center justify-center">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                {responseMessage}
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-base text-center">
                Your Passcode is set and ready to use. You’re now one step
                <br /> closer to secure and seamless transactions. Remember to
                <br /> keep your Passcode private and safe
              </p>
            </div>

            <div className="flex justify-center  w-[80%] gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                onClick={() => navigate("/transaction-pin")}
              >
                Continue
              </button>
            </div>
          </div>
        </PopUp>
      )}
    </AuthLayout>
  );
};

export default ConfirmPasscode;
