import FormInput from "../../../components/FormInput";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";
import { selectAccount } from "../../../store/slice/account";
import {
  setUploadCurrentStep,
  setUploadPayload,
} from "../../../store/slice/uploadSlic";

const UploadDebitAccount = () => {
  const dispatch = useAppDispatch();
  const { accountDetails } = useAppSelector(selectAccount);
  const onSubmit = async (formData: { accountNumber: string }) => {
    dispatch(setUploadPayload({ fromAccountNumber: formData.accountNumber }));
    dispatch(setUploadCurrentStep(2));
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
    <div className="flex flex-col gap-10">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Debit Account
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select Debit account e.g POS Balance or Account Balance
        </p>
      </div>

      <div className="form">
        <form
          action="#"
          className="flex gap-8 flex-col"
          onSubmit={handleSubmit}
        >
          <FormInput
            id={"accountNumber"}
            type="searchSelect"
            placeholder="Debit Account"
            className="flex flex-col gap-4"
            name="accountNumber"
            selectOptions={accountDetails}
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

export default UploadDebitAccount;
