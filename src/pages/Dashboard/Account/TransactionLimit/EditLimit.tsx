import FormInput from "../../../../components/FormInput";
import BackNavigation from "../../../../components/ArrowBack/Back";
import { CautionIcon } from "../../../../assets/svg/CustomSVGs";

const EditLimit = () => {
  return (
    <form className="flex flex-col gap-8 w-[70%]">
      <div className="flex items-start justify-start w-[25%] ">
        <BackNavigation />
      </div>

      <FormInput
        placeholder="Desired Daily Transfer Amount"
        type="text"
        id={"email"}
        name="email"
      />
      <div
        className="px-6 py-2 -mt-3 gap-4 rounded-md items-center flex w-full"
        style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
      >
        <CautionIcon />
        <p className="text-greyColr font-workSans leading-4 font-normal text-xs">
          Your Maximum Transfer Limit is NGN 500,000.00
        </p>
      </div>

      <div className="flex justify-center  w-full gap-6">
        <button className="main-btn w-full" type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default EditLimit;
