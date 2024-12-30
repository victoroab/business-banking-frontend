import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import AuthLayout from "../../../layout/AuthLayout";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../hooks";
import { setPhoneNumber } from "../../../store/slice/authSlice";

const SignIn = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const initialValues = {
    phoneNumber: "",
  };

  const onSubmit = async (formData: { phoneNumber: string }) => {
    dispatch(setPhoneNumber(formData.phoneNumber));
    navigate("/signin-passcode");
  };

  const formSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <div>
      {" "}
      <AuthLayout loginBtn={false} terms>
        <div className="text-center flex justify-center items-center flex-col mt-48">
          <form onSubmit={handleSubmit} className="flex px-6 flex-col gap-8">
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
              placeholder={"phoneNumber/Account Number"}
              type="text"
              id={"phoneNumber"}
              name="phoneNumber"
              error={touched.phoneNumber ? errors.phoneNumber : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.phoneNumber}
            />

            <div className="flex justify-center  w-full gap-6">
              <button className="main-btn w-full" type="submit">
                Continue
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignIn;
