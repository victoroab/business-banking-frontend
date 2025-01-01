import * as Yup from "yup";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import FormInput from "../../../components/FormInput";
import { ResetPasswordIcon } from "../../../assets/svg/Accout";

const ResetPasscode = () => {
  const initialValues = {
    email: "",
  };

  const onSubmit = async (formData: { email: string }) => {
    try {
      console.log(formData.email);
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
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Reset Passcode
        </h3>
      </div>

      <div
        className="py-10 px-20 gap-4 rounded-xl flex flex-col w-full justify-center items-center"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <form className="flex flex-col gap-8 w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="rounded-full p-6 w-[138px] h-[138px] bg-[#fdfbf6] flex justify-center items-center">
              <ResetPasswordIcon />
            </div>
            <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
              Verify This Request
            </h3>
            <p className="text-greyColr font-workSans leading-4 font-normal text-sm text-center">
              To reset your passcode, we need to verify your request first.
              Enter your email adress and a code will be sent to your mail.
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
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasscode;
