import { BeneficiaryIcon } from "../../../assets/svg/PayBill";
import FormInput from "../../../components/FormInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useGetAllBanksQuery,
  useNameEnquiryMutation,
} from "../../../service/transaction";
import {
  setSendMoneyPayload,
  setTransactionCurrentStep,
} from "../../../store/slice/transactionSlice";
import { useAppDispatch } from "../../../hooks";
import { useEffect, useState } from "react";
import { errorHandler } from "../../../utils";
import Spinner from "../../../components/Spinner/Spinner";
import { OkayIcon } from "../../../assets/svg/dashboard";
import { useGetAllBeneficiariesQuery } from "../../../service/beneficiary";

const BankDetails = () => {
  const dispatch = useAppDispatch();
  const [nameEnquiry, { isLoading }] = useNameEnquiryMutation();
  const [openBeneficiary, setOpenBeneficiary] = useState<boolean>(false);
  const [beneficiaryAccountDetails, setBeneficiaryAccountDetails] =
    useState<any>();
  const { data, isLoading: bankLoading } = useGetAllBanksQuery();
  const [bankList, setBankList] = useState<any>();

  const { data: allBeneficiaries, isLoading: beneficiariesLoading } =
    useGetAllBeneficiariesQuery({
      beneficiaryType: "TRANSFER",
      pageNumber: 1,
      pageSize: 10,
    });

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
      setOpenBeneficiary(false);
      dispatch(
        setSendMoneyPayload({
          ...formData,
          accountName: response?.data?.name,
          bankName: response?.data?.bankName,
        })
      );
    } catch (error: any) {
      setFieldValue("accountNumber", "");
      errorHandler(error);
    }
  };
  const initialValues = {
    accountNumber: "",
    bankCode: "",
  };
  const formSchema = Yup.object().shape({
    accountNumber: Yup.string().required(),
    bankCode: Yup.string(),
  });
  const {
    values,
    touched,
    errors,
    isValid,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: formSchema,
    onSubmit,
  });
  console.log(values);
  useEffect(() => {
    if (openBeneficiary) {
      const selectedBeneficiary = allBeneficiaries?.data?.data?.find(
        (beneficiary: any) => beneficiary.accountNumber === values.accountNumber
      );
      console.log(selectedBeneficiary);
      setFieldValue("bankCode", selectedBeneficiary?.bankCode as string);
      setFieldValue(
        "accountNumber",
        selectedBeneficiary?.accountNumber as string
      );
    }

    if (values?.accountNumber?.length === 10) {
      handleSubmit();
    }
  }, [values?.accountNumber]);

  useEffect(() => {
    setBankList(data);
  }, [data]);
  console.log(isValid);
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
              searchFunc
              isLoading={bankLoading}
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
              <>
                {" "}
                {beneficiaryAccountDetails !== undefined && (
                  <p className="bg-[#f7f8ff] rounded-xl p-2 font-semibold text-greyColr gap-2 flex items-center">
                    <OkayIcon />{" "}
                    {beneficiaryAccountDetails?.name?.toUpperCase() as string}
                  </p>
                )}
              </>
            )}
            <div className="flex justify-center flex-col w-full items-center">
              <div className="tex-[20px] font-workSans text-lightGreyColor">
                OR
              </div>
              <BeneficiaryIcon
                className="cursor-pointer"
                onClick={() => setOpenBeneficiary(true)}
              />
              <p className="flex font-workSans text-sm">
                Select From Saved Beneficiary
              </p>
            </div>

            {openBeneficiary && (
              <FormInput
                id={"accountNumber"}
                type="searchSelect"
                placeholder="Select Beneficiary"
                className="flex flex-col gap-4"
                name="accountNumber"
                selectOptions={allBeneficiaries?.data?.data}
                keyPropertyName="accountNumber"
                valuePropertyName="accountNumber"
                itemPropertyName="accountNumber"
                accountName="accountName"
                accountType="accountType"
                error={touched.accountNumber ? errors.accountNumber : undefined}
                onBlur={handleBlur}
                onChange={handleChange}
                defaultValue={values?.accountNumber}
                bankName="bankName"
                inputClassName="w-full"
                isLoading={beneficiariesLoading}
              />
            )}

            <div className="flex justify-center  w-full gap-6">
              <button
                className="main-btn w-full"
                onClick={() =>
                  isValid && dispatch(setTransactionCurrentStep(3))
                }
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
