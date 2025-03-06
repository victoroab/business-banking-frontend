import FormInput from "../../../components/FormInput";
import { industries } from "../../../utils";
import * as Yup from "yup";
import { useFormik } from "formik";
import Calender from "../../../components/Calendar/DatePicker";
import { useAppDispatch } from "../../../hooks";
import {
  setUploadCurrentStep,
  setUploadPayload,
} from "../../../store/slice/uploadSlic";
import { useState } from "react";

const UploadPaymentPeriod = () => {
  const dispatch = useAppDispatch();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const onSubmit = async (formData: { month: string; year: string }) => {
    dispatch(
      setUploadPayload({
        month: formData.month,
        year: formData.year,
        paymentDate: selectedDate,
      })
    );
    dispatch(setUploadCurrentStep(3));
  };

  const initialValues = {
    month: "",
    year: "",
  };
  const formSchema = Yup.object().shape({
    month: Yup.string(),
    year: Yup.string(),
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
          Select Payment Period
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Pick your preferred payment frequency from the options
        </p>
      </div>

      <div className="flex gap-8 flex-col">
        <form
          action="#"
          className="flex gap-6 flex-col"
          onSubmit={handleSubmit}
        >
          <FormInput
            id="month"
            name="month"
            type="text"
            placeholder="Month"
            error={touched.month ? errors.month : undefined}
            defaultValue={values?.month}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FormInput
            id="year"
            name="year"
            type="text"
            selectOptions={industries}
            placeholder="Year"
            defaultValue={values?.year}
            error={touched.year ? errors.year : undefined}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </form>
        <div className="flex justify-center  w-full gap-6">
          <button className="main-btn w-full" type="submit">
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPaymentPeriod;
