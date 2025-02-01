import FormInput from "../../../../components/FormInput";
import { BeneficiaryIcon } from "../../../../assets/svg/PayBill";
import {
  setAirtimeBundlePayload,
  setAirtimeDataCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
import { useAppDispatch } from "../../../../hooks";
import * as Yup from "yup";
import { useFormik } from "formik";

const AddBeneficiary = () => {
  const dispatch = useAppDispatch();
  const onSubmit = async (formData: { phoneNumber: string }) => {
    dispatch(
      setAirtimeBundlePayload({
        phoneNumber: formData.phoneNumber,
      }),
      setAirtimeDataCurrentStep(5)
    );
  };
  const initialValues = {
    phoneNumber: "",
  };
  const formSchema = Yup.object().shape({
    phoneNumber: Yup.string(),
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
          Add Beneficiary
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Enter beneficiary details
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
            placeholder="Phone Number"
            id="phoneNumber"
            className="w-full"
            name="phoneNumber"
            error={touched.phoneNumber ? errors.phoneNumber : undefined}
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.phoneNumber}
          />

          <div className="flex justify-center flex-col w-full items-center">
            <div className="tex-[20px] font-workSans text-lightGreyColor">
              OR
            </div>
            <BeneficiaryIcon className="cursor-pointer" />
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

export default AddBeneficiary;
