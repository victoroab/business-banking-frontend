// import { useNavigate } from "react-router-dom";
import FormInput from "../../../../components/FormInput";
import { industries } from "../../../../utils";
import { setPosCurrentStep } from "../../../../store/slice/posSlice";
import { useAppDispatch } from "../../../../hooks";

const DeliveryOption = () => {
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    // navigate("/request-pos/confirmation");
    dispatch(setPosCurrentStep(5));
  };

  return (
    <div className="flex flex-col gap-14 pr-6">
      <div className="gap-4 flex flex-col">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Select Delivery Option
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select your preferred deliver option
        </p>
      </div>

      <div className="form">
        <form action="#" className="flex gap-8 flex-col">
          <FormInput
            id="debitAccount"
            name="debitAccount"
            // label=""
            type="cSelect"
            selectOptions={industries}
            placeholder="Pick up branch"
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

export default DeliveryOption;
