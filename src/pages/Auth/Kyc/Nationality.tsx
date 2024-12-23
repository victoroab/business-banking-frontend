import React from "react";
import { KYCPageProps } from "../../../interfaces/Global";
import FormInput from "../../../components/FormInput";
import toast from "react-hot-toast";
import { useSetNationalityMutation } from "../../../service/kyb";
import * as Yup from "yup";
import { useFormik } from "formik";

const Nationality: React.FC<KYCPageProps> = ({ setCurrentStep }) => {
  const [setNationality] = useSetNationalityMutation();
  const initialValues = {
    country: "",
  };

  const onSubmit = async (formData: { country: string }) => {
    try {
      const response = await setNationality(formData).unwrap();
      toast.success(response?.message);
      setCurrentStep(2);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const terminalProfileSchema = Yup.object().shape({
    country: Yup.string().required("country is required"),
  });

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: terminalProfileSchema,
      onSubmit,
    });

  return (
    <div className="flex flex-col gap-10 pr-20">
      <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
        Nationality
      </h3>

      <div className="form">
        <form
          action="#"
          className="flex gap-8 flex-col "
          onSubmit={handleSubmit}
        >
          <FormInput
            id={""}
            placeholder="Nigeria"
            label="Country"
            name="country"
            error={touched.country ? errors.country : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.country}
            className="flex flex-col gap-4"
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

export default Nationality;
