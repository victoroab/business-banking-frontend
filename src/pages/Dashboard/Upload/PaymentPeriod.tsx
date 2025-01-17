import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import { industries } from "../../../utils";

const UploadPaymentPeriod = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/uploads/upload-file");
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Select Payment Period
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Pick your preferred payment frequency from the options
        </p>
      </div>

      <div className="flex gap-8 flex-col">
        <form action="#" className="flex gap-6 flex-col">
          <FormInput
            id="debitAccount"
            name="debitAccount"
            type="text"
            placeholder="Enter employer code"
            //  defaultValue={values?.industry}
            //  onChange={handleChange}
            //  onBlur={handleBlur}
          />
          <FormInput
            id="debitAccount"
            name="debitAccount"
            type="text"
            selectOptions={industries}
            placeholder="Email address"
            //  defaultValue={values?.industry}
            //  onChange={handleChange}
            //  onBlur={handleBlur}
          />
        </form>
        <div className="flex justify-center  w-full gap-6">
          <button
            className="main-btn w-full"
            type="submit"
            onClick={handleSubmit}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPaymentPeriod;
