import toast from "react-hot-toast";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";

const SecurityQuestion = () => {
  const initialValues = {
    address: "",
    city: "",
  };

  const onSubmit = async (formData: any) => {
    try {
      console.log(formData);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const businessAddressSchema = Yup.object().shape({
    address: Yup.string().required("Address is required"),
    city: Yup.string().required("City is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: businessAddressSchema,
      onSubmit,
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 justify-center items-center w-[80%]"
    >
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Security Question
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Enhance the security of your account by setting a security question.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <FormInput
          id={""}
          placeholder="Security Question"
          name="address"
          error={touched.address ? errors.address : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.address}
        />
        <FormInput
          id={""}
          placeholder="Answer"
          name="city"
          error={touched.city ? errors.city : undefined}
          onBlur={handleBlur}
          onChange={handleChange}
          defaultValue={values?.city}
        />
      </div>

      <div className="flex justify-center  w-full gap-6">
        <button className="main-btn w-full" type="submit">
          Set Security Question
        </button>
      </div>
    </form>
  );
};

export default SecurityQuestion;
