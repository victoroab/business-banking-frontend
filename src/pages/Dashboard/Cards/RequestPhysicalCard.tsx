// import { useNavigate } from "react-router-dom";
import { YellowCardImage } from "../../../assets/svg/RequestCards";
import BackNavigation from "../../../components/ArrowBack/Back";
import Navbar from "../../../components/Navbar/Navbar";
import { useState } from "react";
// import Select from "../../../components/Select/Select";
import FormInput from "../../../components/FormInput";
import { ExclamationIcon } from "../../../assets/svg/Card";
// import { useAppSelector } from "../../../hooks";
// import { selectGlobal } from "../../../store/slice/globalSlice";
import { useGlobalHooks } from "../../../hooks/globalHooks";
import CardIssuance from "../../../components/Card/CardIssuance";
// import PopUp from "../../../components/PopUps/PopUp";
// import Otp from "../../../components/OTP/Otp";
import CardRequest from "../../../components/Card/CardRequest";

const RequestPhysicalCard = () => {
  //   const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState("selfPickUp"); // "selfPickUp" or "homeDelivery"
  // const toggle = useAppSelector(selectGlobal);
  const { handleShow } = useGlobalHooks();
  // const [otpCode, setOtpCode] = useState<string>("");
  const handleViewDetails = () => {
    handleShow("card-issuance");
  };
  const [formData, setFormData] = useState({
    account: "",
    cardType: "",
    pickupBranch: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const handleDeliveryOptionChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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
          <div className="flex flex-col justify-center gap-10 bg-white px-20 py-20 font-workSans">
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
                    value="selfPickUp"
                    checked={deliveryOption === "selfPickUp"}
                    onChange={handleDeliveryOptionChange}
                    className="w-4 h-4"
                  />
                  Self Pickup
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="deliveryOption"
                    value="homeDelivery"
                    checked={deliveryOption === "homeDelivery"}
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
            {deliveryOption === "selfPickUp" && (
              <div className="flex flex-col gap-4">
                <FormInput
                  type="text"
                  id="account"
                  name="account"
                  defaultValue={formData.account}
                  onChange={handleInputChange}
                  placeholder="Account"
                  className="input-field"
                />
                {/* Card Type Select */}
                <FormInput
                  type="cSelect"
                  placeholder="Card Type"
                  id="cardType"
                  selectOptions={["Mastercard", "Visa"]}
                  //   selectedOption={formData.cardType}
                  //   setSelectedOption={(option) =>
                  //     setFormData({ ...formData, cardType: option })
                  //   }
                />

                {/* Pickup Branch Select */}
                <FormInput
                  type="cSelect"
                  id="pickupBranch"
                  selectOptions={["Yaba", "VI", "Trade Fair", "Lekki"]}
                  //   selectedOption={formData.pickupBranch}
                  //   setSelectedOption={(option) =>
                  //     setFormData({ ...formData, pickupBranch: option })
                  //   }
                  placeholder="Pickup Branch"
                />
                {/* Submit button */}
                <button
                  className="main-btn mt-4 w-[472px]"
                  onClick={() => handleShow("otpVerification")}
                >
                  Continue
                </button>
              </div>
            )}
            <CardRequest />

            {deliveryOption === "homeDelivery" && (
              <div className="flex flex-col gap-4">
                <FormInput
                  type="text"
                  id="account"
                  name="account"
                  defaultValue={formData.account}
                  onChange={handleInputChange}
                  placeholder="Account"
                  className="input-field"
                />
                <FormInput
                  type="cSelect"
                  id="cardType"
                  selectOptions={["Mastercard", "Visa"]}
                  // selectedOption={formData.cardType}
                  // setSelectedOption={(option) =>
                  //   setFormData({ ...formData, cardType: option })
                  // }
                  placeholder="Select Card Type"
                />
                <FormInput
                  //   label="Address"
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  defaultValue={formData.address}
                  onChange={handleInputChange}
                />
                <FormInput
                  //   label="City"
                  type="text"
                  id="city"
                  name="city"
                  placeholder="City"
                  defaultValue={formData.city}
                  onChange={handleInputChange}
                />
                <FormInput
                  type="text"
                  id="state"
                  name="state"
                  placeholder="State"
                  defaultValue={formData.state}
                  onChange={handleInputChange}
                />
                <FormInput
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  placeholder="Zip Code"
                  defaultValue={formData.zipCode}
                  onChange={handleInputChange}
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
                {/* Submit button */}
                <button
                  className="main-btn mt-4 w-[472px]"
                  onClick={handleViewDetails}
                >
                  Continue
                </button>

                <CardIssuance />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestPhysicalCard;
