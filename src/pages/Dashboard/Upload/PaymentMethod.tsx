import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import { industries } from "../../../utils";

const UploadPaymentMode = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/uploads/payment-date");
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Select Payment Mode For Other Bank
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Choose your preferred payment mode to complete your transaction
        </p>
      </div>

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
          <FormInput
            id="debitAccount"
            name="debitAccount"
            label="Debit Account"
            type="cSelect"
            selectOptions={industries}
            placeholder="Select industry"
            keyPropertyName="industry"
            valuePropertyName="industry"
            itemPropertyName="industry"
            //  defaultValue={values?.industry}
            //  onChange={handleChange}
            //  onBlur={handleBlur}
          />
          <div className="flex justify-center  w-full gap-6">
            <button
              className="main-btn w-full"
              type="submit"
              onClick={handleSubmit}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPaymentMode;
