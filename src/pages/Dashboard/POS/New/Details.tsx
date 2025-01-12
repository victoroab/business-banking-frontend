import { useNavigate } from "react-router-dom";
import FormInput from "../../../../components/FormInput";
import { industries } from "../../../../utils";

const Details = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/request-pos/delivery-option");
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Enter POS Details
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please provide the necessary information to complete your POS device
          request
        </p>
      </div>

      <div className="form">
        <form action="#" className="flex gap-4 flex-col">
          <FormInput
            id="debitAccount"
            name="debitAccount"
            // label=""
            type="text"
            selectOptions={industries}
            placeholder="Business Name"
            keyPropertyName="industry"
            valuePropertyName="industry"
            itemPropertyName="industry"
            //  defaultValue={values?.industry}
            //  onChange={handleChange}
            //  onBlur={handleBlur}
          />
          <FormInput
            id="debitAccount"
            name="debitAccount"
            // label=""
            type="text"
            selectOptions={industries}
            placeholder="POS Terminal Name"
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

export default Details;
