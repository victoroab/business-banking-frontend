import { toast } from "react-toastify";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormInput from "../../../components/FormInput";
import Calender from "../../../components/Calendar/DatePicker";
import { useState } from "react";
import { documentFormats } from "../../../utils";

const BankStatement = () => {
  const [startDob, setStartDob] = useState<string>("");
  const [endDob, setEndDob] = useState<string>("");
  const initialValues = {
    format: "",
  };

  const onSubmit = async (formData: any) => {
    try {
      console.log(formData);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  };

  const businessAddressSchema = Yup.object().shape({
    format: Yup.string().required("format is required"),
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
      className="flex flex-col gap-6 justify-center items-center w-[472px]"
    >
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Bank Statement
        </h3>
      </div>

      <div className="flex flex-col gap-4 w-full">
        <Calender setSelectedDate={setStartDob} selectedDate={startDob} />
        <Calender setSelectedDate={setEndDob} selectedDate={endDob} />
        <FormInput
          placeholder="PDF"
          id={"format"}
          name="format"
          error={touched.format ? errors.format : undefined}
          type="cSelect"
          selectOptions={documentFormats}
          keyPropertyName="format"
          valuePropertyName="format"
          itemPropertyName="format"
          defaultValue={values?.format}
          onChange={handleChange}
          onBlur={handleBlur}
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

export default BankStatement;
