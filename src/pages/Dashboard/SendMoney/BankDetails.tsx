import { BeneficiaryIcon } from "../../../assets/svg/PayBill";
import FormInput from "../../../components/FormInput";
import { useNavigate } from "react-router-dom";

const BankDetails = () => {
  const handleSubmit = () => {
    const navigate = useNavigate();
    navigate("/send-money/amount");
  };

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
          <form action="#" className="flex gap-8 flex-col">
            <FormInput
              id={""}
              placeholder="Account Number"
              className="flex flex-col gap-4"
            />
            <FormInput
              id={""}
              placeholder="Bank"
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
    </>
  );
};

export default BankDetails;
