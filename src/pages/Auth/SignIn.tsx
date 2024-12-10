import AuthLayout from "../../layout/AuthLayout";
import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";

const SignIn = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <AuthLayout loginBtn={false} terms>
        <div className="text-center flex justify-center items-center flex-col mt-48">
          <div className="flex px-6 flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Login
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                To log in, please enter the phone number or account number
                linked
                <br /> to your Alert account
              </p>
            </div>

            <FormInput
              placeholder="Phone Number/Account Number"
              type="text"
              id={"phoneNumber"}
            />

            <div className="flex justify-center  w-full gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                onClick={() => navigate("/verify-otp")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
