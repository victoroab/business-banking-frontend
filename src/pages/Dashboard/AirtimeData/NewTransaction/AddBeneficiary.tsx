import FormInput from "../../../../components/FormInput";
import { BeneficiaryIcon } from "../../../../assets/svg/PayBill";
import { useNavigate } from "react-router-dom";

const AddBeneficiary = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/airtime-data/confirmation");
  };

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
        <form action="#" className="flex gap-8 flex-col">
          <FormInput
            id={""}
            placeholder="Meter Number"
            className="flex flex-col gap-4"
          />

          <div className="flex justify-center flex-col w-full items-center">
            <div className="tex-[20px] font-workSans text-lightGreyColor">
              OR
            </div>
            <BeneficiaryIcon className="cursor-pointer" />
          </div>
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

export default AddBeneficiary;
