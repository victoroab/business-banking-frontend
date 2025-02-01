import FormInput from "../../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch } from "../../../../hooks";
import { setAirtimeBundlePayload } from "../../../../store/slice/billPaymentSlice";
import { StepPagesProps } from "../../../../interfaces/Global";

const Amount: React.FC<StepPagesProps> = ({ setCurrentStep }) => {
  const dispatch = useAppDispatch();
  const onSubmit = async (formData: { amount: string }) => {
    dispatch(
      setAirtimeBundlePayload({
        amount: parseFloat(formData.amount),
      }),
      setCurrentStep(3)
    );
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
