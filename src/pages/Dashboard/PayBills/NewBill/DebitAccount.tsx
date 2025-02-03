import FormInput from "../../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { selectAccount } from "../../../../store/slice/account";
import {
  setAirtimeBundlePayload,
  setBillpaymentCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
import { accounts } from "../../../../utils";

const DebitAccount = () => {
  const dispatch = useAppDispatch();
  const { accountDetails } = useAppSelector(selectAccount);

  const onSubmit = async (formData: { accountNumber: string }) => {
    console.log(formData);
    dispatch(
      setAirtimeBundlePayload({ fromAccountNumber: formData.accountNumber }),
      setBillpaymentCurrentStep(2)
    );
  };

  const initialValues = {
    accountNumber: "",
  };
  const formSchema = Yup.object().shape({
    accountName: Yup.string(),
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
          Debit Account
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select Debit account e.g POS Balance or Account Balance
        </p>
      </div>

      <div className="form">
        <form className="flex gap-8 flex-col" onSubmit={handleSubmit}>
          <FormInput
            id={"accountNumber"}
            type="searchSelect"
            placeholder="Debit Account"
            className="flex flex-col gap-4"
            name="accountNumber"
            selectOptions={
              accountDetails?.length > 0 ? accountDetails : accounts
            }
            keyPropertyName="accountNumber"
            valuePropertyName="accountNumber"
            itemPropertyName="accountNumber"
            accountName="accountName"
            accountType="accountType"
            error={touched.accountNumber ? errors.accountNumber : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.accountNumber}
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

export default DebitAccount;
