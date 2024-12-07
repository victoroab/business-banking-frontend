import AuthLayout from "../../layout/AuthLayout";
import Otp from "../../components/OTP/Otp";

const ConfirmTransactionPin = () => {
  return (
    <AuthLayout loginBtn={false} terms>
      <div className="text-center flex justify-center items-center flex-col w-full mt-48">
        <Otp
          page="/confirm-transaction-pin"
          inputCount={4}
          title="Confirm Your Transaction Pin"
          paragraph={
            <p>
              This PIN is to be used to authorize transactions (e.g. transfers,
              <br /> airtime purchases, bill payments, etc.)
            </p>
          }
        />
      </div>
    </AuthLayout>
  );
};

export default ConfirmTransactionPin;
