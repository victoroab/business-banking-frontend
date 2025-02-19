import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { useState } from "react";
import { useVerfifyEmailMutation } from "../../service/auth";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { selectAuth } from "../../store/slice/authSlice";
import Spinner from "../../components/Spinner/Spinner";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState<string>("");
  const [verifyEmail, { isLoading }] = useVerfifyEmailMutation();
  const { phoneNumber, email } = useAppSelector(selectAuth);

  const handleSubmit = async () => {
    const requiredData = {
      phoneNumber: phoneNumber,
      email: email,
      otp: otpCode,
    };
    try {
      const response = await verifyEmail(requiredData).unwrap();
      toast.success(response?.message);
      navigate("/passcode");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center gap-8 items-center flex-col w-full mt-48 px-14 ">
        <Otp
          inputCount={6}
          title={"Verify Your Email Address"}
          setOtpCode={setOtpCode}
          otpCode={otpCode}
          paragraph={
            <p>
              We sent a 6 digit code to {email}. Check your email and enter it
              here.
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

export default VerifyEmail;
