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
import { useValidateCableMutation } from "../../../../../service/billPayment";
import { OkayIcon } from "../../../../../assets/svg/dashboard";
import Spinner from "../../../../../components/Spinner/Spinner";

const CableBeneficiary = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const [beneficiaryDetails, setBeneficiaryDetails] = useState<any>();
  const { billPaymentPayload } = useAppSelector(selectBillPayment);
  const [validateCable, { isLoading }] = useValidateCableMutation();

  const initialValues = {
    cardNumber: "",
  };
  const formSchema = Yup.object().shape({
    cardNumber: Yup.string(),
  });

  const onSubmit = async (formData: { cardNumber: string }) => {
    try {
      const requiredData = {
        serviceCategoryId: billPaymentPayload?.serviceCategoryId,
        cardNumber: formData.cardNumber,
      };
      const response = await validateCable(requiredData).unwrap();

      setBeneficiaryDetails(response?.data);
      dispatch(
        setBillPaymentPayload({
          ...formData,
          cardNumber: response?.data?.cardNumber,
          name: response?.data?.name,
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
    if (values?.cardNumber?.length === 11) {
      handleSubmit();
    }
  }, [values?.cardNumber]);

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
            placeholder="Card Number"
            id="cardNumber"
            className="w-full"
            name="cardNumber"
            error={
              touched.cardNumber ? (errors.cardNumber as string) : undefined
            }
            onBlur={handleBlur}
            onChange={handleChange}
            defaultValue={values?.cardNumber}
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

export default CableBeneficiary;
