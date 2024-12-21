import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";
import { useState } from "react";
import { useVerfifyPhoneMutation } from "../../service/auth";
import { useAppSelector } from "../../hooks";
import { selectAuth } from "../../store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otpCode, setOtpCode] = useState<string>("");
  const [verifyPhone] = useVerfifyPhoneMutation();
  const { phoneNumber } = useAppSelector(selectAuth);

  const handleSubmit = async () => {
    const requiredData = {
      phoneNumber: phoneNumber,
      otp: otpCode,
    };
    try {
      const response = await verifyPhone(requiredData).unwrap();
      toast.success(response?.message);
      navigate("/passcode");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center gap-8 items-center flex-col w-full mt-48 px-6 ">
        <Otp
          inputCount={6}
          title={"Verify Your Phone Number"}
          setOtpCode={setOtpCode}
          otpCode={otpCode}
          paragraph={
            <p>
              We sent a 6 digit code to ***4858. Check your SMS and enter it
              <br /> here.
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
