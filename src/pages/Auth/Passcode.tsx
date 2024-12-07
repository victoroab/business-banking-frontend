import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";

const Passcode = () => {
  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48">
        <Otp
          page="/confirm-passcode"
          inputCount={6}
          title={"Set Up Your Business Account Passcode"}
          paragraph={
            <p>
              Your passcode will help keep your account safe and allow quick
              <br /> access to your banking app.
            </p>
          }
        />
      </div>
    </AuthLayout>
  );
};

export default Passcode;
