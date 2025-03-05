import FormInput from "../../../components/FormInput";
import { paymentModes } from "../../../utils";
import { CautionIcon } from "../../../assets/svg/CustomSVGs";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  setUploadCurrentStep,
  setUploadPayload,
} from "../../../store/slice/uploadSlic";
import { useAppDispatch } from "../../../hooks";

const UploadPaymentMode = () => {
  const dispatch = useAppDispatch();
  const onSubmit = async (formData: { paymentMode: string }) => {
    dispatch(setUploadPayload({ paymentMode: formData.paymentMode }));
    dispatch(setUploadCurrentStep(3));
  };

  const initialValues = {
    paymentMode: "",
  };
  const formSchema = Yup.object().shape({
    paymentMode: Yup.string(),
  });
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <div className="flex flex-col gap-10 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Select Payment Mode For Other Bank
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Choose your preferred payment mode to complete your transaction
        </p>
      </div>

      <div className="form">
        <form
          action="#"
          className="flex gap-8 flex-col"
          onSubmit={handleSubmit}
        >
          <FormInput
            id="paymentMode"
            name="paymentMode"
            label="Payment Mode"
            type="cSelect"
            selectOptions={paymentModes}
            placeholder="Select Payment Mode"
            keyPropertyName="mode"
            valuePropertyName="mode"
            itemPropertyName="mode"
            defaultValue={values?.paymentMode}
            onChange={handleChange}
            error={touched.paymentMode ? errors.paymentMode : undefined}
            onBlur={handleBlur}
          />
          <div
            className="px-6 py-2 -mt-3 gap-4 rounded-md items-center flex w-full"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
          >
            <CautionIcon />
            <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
              The payment mode for this transaction is set to NIP INSTANT by
              default, ensuring that funds are transferred instantly to the
              recipient’s bank account.
            </p>
          </div>
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

export default UploadPaymentMode;
