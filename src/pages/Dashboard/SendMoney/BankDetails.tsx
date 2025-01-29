import { BeneficiaryIcon } from "../../../assets/svg/PayBill";
import FormInput from "../../../components/FormInput";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useGetAllBanksQuery,
  useNameEnquiryMutation,
} from "../../../service/transaction";
import { setSendMoneyPayload } from "../../../store/slice/transactionSlice";
import { useAppDispatch } from "../../../hooks";
import { useEffect, useState } from "react";
import { errorHandler } from "../../../utils";
import Spinner from "../../../components/Spinner/Spinner";

const BankDetails = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [nameEnquiry, { isLoading }] = useNameEnquiryMutation();
  const [beneficiaryAccountDetails, setBeneficiaryAccountDetails] =
    useState<any>();
  const { data } = useGetAllBanksQuery();
  const [bankList, setBankList] = useState<any>();
  const onSubmit = async (formData: {
    bankCode: string;
    accountNumber: string;
  }) => {
    try {
      const requiredData = {
        accountNumber: formData.accountNumber,
        bankCode: formData.bankCode,
      };
      const response = await nameEnquiry(requiredData).unwrap();

      setBeneficiaryAccountDetails(response?.data);
      dispatch(
        setSendMoneyPayload({
          ...formData,
          accountName: response?.data?.name,
          bankName: response?.data?.bankName,
        })
      );
    } catch (error: any) {
      errorHandler(error);
    }
  };
  const initialValues = {
    accountNumber: "",
    bankCode: "",
  };
  const formSchema = Yup.object().shape({
    accountNumber: Yup.string(),
    bankCode: Yup.string(),
  });
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  useEffect(() => {
    if (values.accountNumber.length === 10) {
      handleSubmit();
    }
  }, [values?.accountNumber]);

  useEffect(() => {
    setBankList(data);
  }, [data]);

  return (
    <>
      <div className="flex flex-col gap-14">
        <div className="gap-4 flex flex-col">
          <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
            Bank Details
          </h3>
          <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
            Provide the recipient’s bank details and account number.
          </p>
        </div>

        <div className="form">
          <div className="flex gap-8 flex-col">
            <FormInput
              type="cSelect"
              placeholder="Bank"
              id="bankCode"
              className="w-full"
              name="bankCode"
              selectOptions={bankList?.data}
              keyPropertyName="Name"
              valuePropertyName="Code"
              itemPropertyName="Name"
              error={touched.bankCode ? errors.bankCode : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.bankCode}
            />

            <FormInput
              type="text"
              placeholder="Account Number"
              id="accountNumber"
              className="w-full"
              name="accountNumber"
              error={touched.accountNumber ? errors.accountNumber : undefined}
              onBlur={handleBlur}
              onChange={handleChange}
              defaultValue={values?.accountNumber}
            />
            {isLoading ? (
              <Spinner />
            ) : (
              <>{beneficiaryAccountDetails?.name as string}</>
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
                onClick={() => navigate("/send-money/amount")}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BankDetails;
