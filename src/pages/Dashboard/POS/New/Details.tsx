// import { useNavigate } from "react-router-dom";
import FormInput from "../../../../components/FormInput";
import {
  setPosCurrentStep,
  setResquestPOS,
} from "../../../../store/slice/posSlice";
import { useAppDispatch } from "../../../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";

const Details = () => {
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: { merchantName: string }) => {
    dispatch(setResquestPOS({ merchantName: formData?.merchantName }));
    dispatch(setPosCurrentStep(4));
  };

  const initialValues = {
    merchantName: "",
  };
  const formSchema = Yup.object().shape({
    merchantName: Yup.string(),
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
          Enter POS Details
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please provide the necessary information to complete your POS device
          request
        </p>
      </div>

      <div className="form">
        <form
          action="#"
          onSubmit={handleSubmit}
          className="flex gap-4 flex-col"
        >
          <FormInput
            id="merchantName"
            name="merchantName"
            // label=""
            type="text"
            placeholder="Business Name"
            defaultValue={values?.merchantName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.merchantName ? errors.merchantName : undefined}
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

export default Details;
