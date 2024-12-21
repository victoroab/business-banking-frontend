import { useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import AuthLayout from "../../layout/AuthLayout";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useInitiateMutation } from "../../service/auth";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectGlobal } from "../../store/slice/globalSlice";
import toast from "react-hot-toast";
import { setPhoneNumber } from "../../store/slice/authSlice";

const SignUp = () => {
  const { havePersonalAccount } = useAppSelector(selectGlobal);
  const dispatch = useAppDispatch();
  console.log(havePersonalAccount);

  const navigate = useNavigate();
  const [initiate] = useInitiateMutation();

  const initialValues = {
    phoneNumber: "",
  };

  const onSubmit = async (formData: { phoneNumber: string }) => {
    console.log(formData);

    try {
      const response = await initiate(formData).unwrap();
      toast.success(response?.message);
      dispatch(setPhoneNumber(formData.phoneNumber));
      navigate("/verify-otp");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const terminalProfileSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("Phone number is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: terminalProfileSchema,
      onSubmit,
    });

  return (
    <div>
      {" "}
      <AuthLayout loginBtn={false} terms>
        <div className="text-center flex justify-center items-center flex-col mt-48">
          <form className="flex px-6 flex-col gap-8" onSubmit={handleSubmit}>
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
              placeholder="070000000000"
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

export default SignUp;
