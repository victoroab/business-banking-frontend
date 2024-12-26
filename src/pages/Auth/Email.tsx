import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import { useSetEmailMutation } from "../../service/auth";
import { selectAuth, setEmailAddress } from "../../store/slice/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import FormInput from "../../components/FormInput";
import AuthLayout from "../../layout/AuthLayout";
import Spinner from "../../components/Spinner/Spinner";

const EmailAddress = () => {
  const { phoneNumber } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [setEmail, { isLoading }] = useSetEmailMutation();

  const initialValues = {
    email: "",
  };

  const onSubmit = async (formData: { email: string }) => {
    console.log(formData);

    try {
      const requiredData = {
        phoneNumber: phoneNumber,
        email: formData.email,
      };
      const response = await setEmail(requiredData).unwrap();
      toast.success(response?.message);
      dispatch(setEmailAddress(formData.email));
      navigate("/verify-email");
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const formSchema = Yup.object().shape({
    email: Yup.string().required("Email is required"),
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
        <div className="text-center flex justify-center items-center flex-col mt-48 w-full">
          <form
            className="flex px-8 flex-col gap-8 w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                Enter your email address
              </h3>
              <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
                Please enter your business email address.
              </p>
            </div>

            <FormInput
              placeholder="email@gmail.com"
              type="text"
              id={"email"}
              name="email"
              error={touched.email ? errors.email : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.email}
            />

            <div className="flex justify-center  w-full gap-6">
              <button className="main-btn w-full" type="submit">
                {isLoading ? <Spinner /> : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default EmailAddress;
