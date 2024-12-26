import FormInput from "../../../components/FormInput";
import BackNavigation from "../../../components/ArrowBack/Back";

const TransactionLimit = () => {
  return (
    <form className="flex px-8 flex-col gap-8 w-full">
      <div className="flex flex-col gap-2">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Transaction Limits
        </h3>
      </div>
      <BackNavigation />

      <FormInput
        placeholder="email@gmail.com"
        type="text"
        id={"email"}
        name="email"
      />

      <div className="flex justify-center  w-full gap-6">
        <button className="main-btn w-full" type="submit">
          Confirm
        </button>
      </div>
    </form>
  );
};

export default TransactionLimit;
