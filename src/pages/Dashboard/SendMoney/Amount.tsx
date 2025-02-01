import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../hooks";
import {
  setSendMoneyPayload,
  setTransactionCurrentStep,
} from "../../../store/slice/transactionSlice";

const Amount = () => {
  const dispatch = useAppDispatch();
  const onSubmit = async (formData: { amount: string; narration: string }) => {
    dispatch(
      setSendMoneyPayload({
        amount: parseFloat(formData.amount),
        narration: formData.narration,
      })
    ),
      setTransactionCurrentStep(4);
  };
  const initialValues = {
    amount: "",
    narration: "",
  };
  const formSchema = Yup.object().shape({
    amount: Yup.string(),
    narration: Yup.string(),
  });
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <div className="flex flex-col gap-14">
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

          <FormInput
            type="text"
            placeholder="Narration(optional)"
            id="narration"
            className="w-full"
            name="narration"
            error={touched.narration ? errors.narration : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.narration}
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

export default Amount;
