import FormInput from "../../../../../components/FormInput";
// import { useNavigate } from "react-router-dom";
import { BeneficiaryIcon } from "../../../../../assets/svg/PayBill";
import {
  selectBillPayment,
  setBillpaymentCurrentStep,
  setBillPaymentPayload,
} from "../../../../../store/slice/billPaymentSlice";
import { useAppDispatch, useAppSelector } from "../../../../../hooks";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { errorHandler } from "../../../../../utils";
import { useValidateElectricityMutation } from "../../../../../service/billPayment";
import { OkayIcon } from "../../../../../assets/svg/dashboard";
import Spinner from "../../../../../components/Spinner/Spinner";

const AddBillBeneficiary = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [beneficiaryDetails, setBeneficiaryDetails] = useState<any>();
  const { billPaymentPayload } = useAppSelector(selectBillPayment);
  const [validateElectricity, { isLoading }] = useValidateElectricityMutation();
  // const handleSubmit = () => {
  //   dispatch(setBillpaymentCurrentStep(6));
  //   dispatch(setBillPaymentPayload({ meterNumber: title }));
  // };
  const initialValues = {
    meterNumber: "",
  };
  const formSchema = Yup.object().shape({
    meterNumber: Yup.string(),
  });

  const onSubmit = async (formData: { meterNumber: string }) => {
    try {
      const requiredData = {
        serviceCategoryId: billPaymentPayload?.serviceCategoryId,
        cardNumber: formData.meterNumber,
        vendType: billPaymentPayload?.vendType,
      };
      const response = await validateElectricity(requiredData).unwrap();

      setBeneficiaryDetails(response?.data);
      dispatch(
        setBillPaymentPayload({
          ...formData,
          meterNumber: response?.data?.meterNumber,
          meterName: response?.data?.name,
          meterAddress: response?.data?.address,
        })
      );
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  useEffect(() => {
    if (values?.meterNumber?.length === 11) {
      handleSubmit();
    }
  }, [values?.meterNumber]);

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
        <div className="flex gap-8 flex-col">
          <FormInput
            type="text"
            placeholder="Meter Number"
            id="meterNumber"
            className="w-full"
            name="meterNumber"
            error={
              touched.meterNumber ? (errors.meterNumber as string) : undefined
            }
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.meterNumber}
          />
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {" "}
              {beneficiaryDetails !== undefined && (
                <p className="bg-[#f7f8ff] rounded-xl p-2 font-semibold text-greyColr gap-2 flex items-center">
                  <OkayIcon />{" "}
                  {beneficiaryDetails?.name?.toUpperCase() as string}
                </p>
              )}
            </>
          )}

          <div className="flex justify-center flex-col w-full items-center">
            <div className="tex-[20px] font-workSans text-lightGreyColor">
              OR
            </div>
            <BeneficiaryIcon className="cursor-pointer" />
          </div>
          <div className="flex justify-center  w-full gap-6">
            <button
              className="main-btn w-full"
              onClick={() => dispatch(setBillpaymentCurrentStep(6))}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBillBeneficiary;
