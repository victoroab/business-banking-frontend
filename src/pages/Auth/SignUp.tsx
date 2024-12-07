import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import AuthLayout from "../../layout/AuthLayout";

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div>
      {" "}
      <AuthLayout loginBtn={false} terms>
        <div className="text-center flex justify-center items-center flex-col mt-48">
          <div className="flex px-6 flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Sign Up
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                To sign up, please enter the phone number linked to your
                personal <br /> Alert account
              </p>
            </div>

            <FormInput
              placeholder="phone number"
              type="text"
              id={"phoneNumber"}
            />

            <div className="flex justify-center  w-full gap-6">
              <button
                className="main-btn w-full"
                type="submit"
                onClick={() => navigate("/verify-otp")}
              >
                continue
              </button>
            </div>
          </div>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUp;
