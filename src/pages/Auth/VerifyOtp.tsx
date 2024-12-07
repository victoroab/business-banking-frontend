import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";

const VerifyOtp = () => {
  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48">
        <Otp
          page="/passcode"
          inputCount={6}
          title={"Verify Your Phone Number"}
          paragraph={
            <p>
              We sent a 6 digit code to ***4858. Check your SMS and enter it
              <br /> here.
            </p>
          }
          resend
        />
      </div>
    </AuthLayout>
  );
};

export default VerifyOtp;
