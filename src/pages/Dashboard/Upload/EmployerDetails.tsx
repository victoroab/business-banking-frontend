import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  setUploadCurrentStep,
  setUploadPayload,
} from "../../../store/slice/uploadSlic";
import { useAppDispatch } from "../../../hooks";
const UploadEmployerDetails = () => {
  const dispatch = useAppDispatch();
  const onSubmit = async (formData: {
    employerCode: string;
    email: string;
  }) => {
    dispatch(
      setUploadPayload({
        employerCode: formData.employerCode,
        email: formData.email,
      })
    );
    dispatch(setUploadCurrentStep(2));
  };

  const initialValues = {
    employerCode: "",
    email: "",
  };
  const formSchema = Yup.object().shape({
    email: Yup.string(),
    employerCode: Yup.string(),
  });
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });
  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Employer Details
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please provide the necessary information about your employer to
          proceed with the process.
        </p>
      </div>

      <div className="flex gap-8 flex-col">
        <form
          action="#"
          className="flex gap-6 flex-col"
          onSubmit={handleSubmit}
        >
          <FormInput
            id="employerCode"
            name="employerCode"
            type="text"
            placeholder="Enter employer code"
            defaultValue={values?.employerCode}
            error={touched.employerCode ? errors.employerCode : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInput
            id="email"
            name="email"
            type="text"
            placeholder="Email address"
            defaultValue={values?.email}
            error={touched.email ? errors.email : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
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

export default UploadEmployerDetails;
