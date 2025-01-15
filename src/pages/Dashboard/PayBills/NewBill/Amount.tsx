import FormInput from "../../../../components/FormInput";
import { useNavigate } from "react-router-dom";
const BillAmount = () => {
  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate("/pay-new-bill/confirmation");
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Amount
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Please input how much electricity you wish to purchase
        </p>
      </div>

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
          <FormInput
            id={""}
            placeholder="Amount"
            className="flex flex-col gap-4"
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

export default BillAmount;
