import FormInput from "../../../components/FormInput";
import { beneficiaryTypes } from "../../../utils";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  setUploadCurrentStep,
  setUploadPayload,
} from "../../../store/slice/uploadSlic";
import { useAppDispatch } from "../../../hooks";

const BeneficiaryType = () => {
  const dispatch = useAppDispatch();
  const onSubmit = async (formData: { beneficiaryType: string }) => {
    dispatch(setUploadPayload({ beneficiaryType: formData.beneficiaryType }));
    dispatch(setUploadCurrentStep(2));
  };

  const initialValues = {
    beneficiaryType: "",
  };
  const formSchema = Yup.object().shape({
    beneficiaryType: Yup.string(),
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
          Beneficiary Type
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select Beneficiary Type e.g Transfer, Airtime, Data, etc
        </p>
      </div>

      <div className="form">
        <form
          action="#"
          className="flex gap-8 flex-col"
          onSubmit={handleSubmit}
        >
          <FormInput
            id="beneficiaryType"
            name="beneficiaryType"
            label="Beneficiary Type"
            type="cSelect"
            selectOptions={beneficiaryTypes}
            placeholder="Select Beneficiary Type"
            keyPropertyName="type"
            valuePropertyName="type"
            itemPropertyName="type"
            defaultValue={values?.beneficiaryType}
            onChange={handleChange}
            error={touched.beneficiaryType ? errors.beneficiaryType : undefined}
            onBlur={handleBlur}
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

export default BeneficiaryType;
