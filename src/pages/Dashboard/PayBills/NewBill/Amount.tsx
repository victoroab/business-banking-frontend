import FormInput from "../../../../components/FormInput";
import { useAppDispatch } from "../../../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  setBillpaymentCurrentStep,
  setBillPaymentPayload,
} from "../../../../store/slice/billPaymentSlice";
// import { useNavigate } from "react-router-dom";
const BillAmount = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const onSubmit = async (formData: { amount: string }) => {
    dispatch(
      setBillPaymentPayload({
        amount: parseFloat(formData.amount),
      })
    );
    dispatch(setBillpaymentCurrentStep(7));
  };
  const initialValues = {
    amount: "",
  };
  const formSchema = Yup.object().shape({
    amount: Yup.string(),
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
          Amount
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please input how much electricity you wish to purchase
        </p>
      </div>

      <div className="form">
        <form
          action="#"
          className="flex gap-8 flex-col"
          onSubmit={handleSubmit}
        >
          <FormInput
            type="text"
            placeholder="Amount"
            id="amount"
            className="w-full"
            name="amount"
            error={touched.amount ? errors.amount : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.amount}
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

export default BillAmount;
