import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";
import { industries } from "../../../utils";
import { useAppSelector } from "../../../hooks";
import { selectUpload } from "../../../store/slice/uploadSlic";

const UploadDebitAccount = () => {
  const navigate = useNavigate();
  const { activeUploadTab } = useAppSelector(selectUpload);
  const link =
    activeUploadTab === 2 || activeUploadTab === 3
      ? "/send-money/uploads/payment-date"
      : "/send-money/uploads/payment-mode";
  const handleSubmit = () => {
    navigate(link);
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Debit Account
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select Debit account e.g POS Balance or Account Balance
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

export default UploadDebitAccount;
