import { YellowCardImage } from "../../../assets/svg/RequestCards";
import BackNavigation from "../../../components/ArrowBack/Back";
import Navbar from "../../../components/Navbar/Navbar";
import { useState } from "react";
import FormInput from "../../../components/FormInput";
import { ExclamationIcon } from "../../../assets/svg/Card";
import CardIssuance from "../../../components/Card/CardIssuance";
import CardRequest from "../../../components/Card/CardRequest";
import * as Yup from "yup";
import { useFormik } from "formik";
import { cardTypes, locations } from "../../../utils";
import { selectAccount } from "../../../store/slice/account";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { setRequestCard } from "../../../store/slice/cardSlice";

const RequestPhysicalCard = () => {
  const [deliveryOption, setDeliveryOption] = useState("PICKUP");

  const { accountDetails } = useAppSelector(selectAccount);
  const dispatch = useAppDispatch();
  const initialValues = {
    fromAccountNumber: "",
    cardType: "",
    pickupBranch: "",
    address: "",
    city: "",
    zipCode: "",
  };

  const handleDeliveryOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(e.target.value);
  };

  const onSubmit = async (formData: {
    fromAccountNumber: string;
    cardType: string;
    pickupBranch: string;
    address: string;
    city: string;
    zipCode: string;
  }) => {
    const requiredData = {
      fromAccountNumber: formData.fromAccountNumber,
      deliverOption: deliveryOption,
      cardType: formData.cardType,
      pickupBranch: formData.pickupBranch,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
    };
    dispatch(setRequestCard(requiredData));
  };

  const formSchema = Yup.object().shape({
    address: Yup.string(),
    city: Yup.string(),
    zipCode: Yup.string(),
  });
  const { values, touched, errors, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: formSchema,
      onSubmit,
    });

  return (
    <>
      <Navbar
        title="Cards"
        subtitle="Easily apply for a debit or credit card tailored to your needs."
      />
      <div className="flex flex-col gap-10">
        <div className="flex justify-start w-48">
          <BackNavigation />
        </div>

        <div className="flex gap-4 bg-pryColor-Light mx-auto p-6 rounded-lg">
          <div className="flex flex-col items-center justify-center gap-6 h-[600px] bg-white px-20 py-20">
            <YellowCardImage />
            <div className="flex flex-col gap-2 text-center">
              <h1 className="font-bricolage font-semibold text-xl text-[#0E0C60]">
                Request Your Physical Card Today
              </h1>
              <p className="font-workSans">
                Withdraw from ATMs, pay on POS machines and pay online.
              </p>
            </div>

            <div className="flex flex-col gap-4  shadow-[0_4px_12px_rgba(0,0,0,0.1)] w-[362px] rounded-[12px] py-6 px-8 text-[#352F36]">
              <div className="text-sm font-semibold">
                <div className="flex justify-between">
                  <span>Card Price</span>
                  <span>₦1,000.00</span>
                </div>
                <div className="flex justify-between">
                  <span>Fee</span>
                  <span>₦0.00</span>
                </div>
                <div className="flex justify-between mt-2 border-t border-gray-300 pt-3">
                  <span>Total Debit</span>
                  <span className="font-bold">₦1,000.00</span>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center gap-10 bg-white px-20 py-20 font-workSans"
          >
            <div className="flex flex-col gap-4">
              <h1 className="font-bricolage font-semibold text-xl text-[#0E0C60]">
                Get Physical Card
              </h1>
              <p>Choose your card type and delivery option</p>
            </div>
            {/* Radio buttons for delivery option */}
            <div className="flex flex-col gap-6">
              <h2>Delivery Option</h2>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="PICKUP"
                    checked={deliveryOption === "PICKUP"}
                    onChange={handleDeliveryOptionChange}
                    className="w-4 h-4"
                  />
                  Self Pickup
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="DELIVERY"
                    checked={deliveryOption === "DELIVERY"}
                    onChange={handleDeliveryOptionChange}
                    className="w-4 h-4"
                  />
                  Home Delivery
                  <div className="ml-2 bg-positive-Light text-positive uppercase text-xs p-1">
                    Coming Soon
                  </div>
                </label>
              </div>
            </div>

            {/* Form fields based on selected delivery option */}
            {deliveryOption === "PICKUP" && (
              <div className="flex flex-col gap-4">
                <FormInput
                  id={"fromAccountNumber"}
                  type="searchSelect"
                  placeholder="Debit Account"
                  className="flex flex-col gap-4"
                  name="fromAccountNumber"
                  selectOptions={accountDetails}
                  keyPropertyName="accountNumber"
                  valuePropertyName="accountNumber"
                  itemPropertyName="accountNumber"
                  accountName="accountName"
                  accountType="accountType"
                  error={
                    touched.fromAccountNumber
                      ? errors.fromAccountNumber
                      : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.fromAccountNumber}
                />

                <FormInput
                  id="cardType"
                  name="cardType"
                  type="cSelect"
                  selectOptions={cardTypes}
                  placeholder="Card type"
                  keyPropertyName="name"
                  valuePropertyName="name"
                  itemPropertyName="name"
                  defaultValue={values?.cardType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardType ? errors.cardType : undefined}
                />
                <FormInput
                  id="pickupBranch"
                  name="pickupBranch"
                  // label=""
                  type="cSelect"
                  selectOptions={locations}
                  placeholder="Pick up branch"
                  keyPropertyName="name"
                  valuePropertyName="name"
                  itemPropertyName="name"
                  defaultValue={values?.pickupBranch}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pickupBranch ? errors.pickupBranch : undefined}
                />
              </div>
            )}
            <CardRequest />

            {deliveryOption === "DELIVERY" && (
              <div className="flex flex-col gap-4">
                <FormInput
                  id={"fromAccountNumber"}
                  type="searchSelect"
                  placeholder="Debit Account"
                  className="flex flex-col gap-4"
                  name="fromAccountNumber"
                  selectOptions={accountDetails}
                  keyPropertyName="accountNumber"
                  valuePropertyName="accountNumber"
                  itemPropertyName="accountNumber"
                  accountName="accountName"
                  accountType="accountType"
                  error={
                    touched.fromAccountNumber
                      ? errors.fromAccountNumber
                      : undefined
                  }
                  onBlur={handleBlur}
                  onChange={handleChange}
                  defaultValue={values?.fromAccountNumber}
                />
                <FormInput
                  id="cardType"
                  name="cardType"
                  type="cSelect"
                  selectOptions={cardTypes}
                  placeholder="Pick up branch"
                  keyPropertyName="name"
                  valuePropertyName="name"
                  itemPropertyName="name"
                  defaultValue={values?.cardType}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.cardType ? errors.cardType : undefined}
                />
                <FormInput
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Address"
                  defaultValue={values?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.address ? errors.address : undefined}
                />

                <FormInput
                  id="city"
                  name="city"
                  // label=""
                  type="text"
                  placeholder="City"
                  defaultValue={values?.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city ? errors.city : undefined}
                />

                <FormInput
                  id="zipCode"
                  name="zipCode"
                  type="text"
                  placeholder="Zip Code"
                  defaultValue={values?.zipCode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.zipCode ? errors.zipCode : undefined}
                />
                <div
                  className="flex items-center justify-center gap-2 text-center w-[472px] mx-auto py-5 rounded-xl my-4"
                  style={{
                    boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                  }}
                >
                  <ExclamationIcon /> Delivery takes between 5 - 7 business
                  working days.
                </div>

                <CardIssuance />
              </div>
            )}

            <button className="main-btn mt-4 w-[472px]" type="submit">
              Continue
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestPhysicalCard;
