import { ArrowRightIcon } from "../../../../../assets/svg/CustomSVGs";
import { useSelector } from "react-redux";
import { electricityType } from "../../../../../utils";
import {
  selectBillPayment,
  setBillpaymentCurrentStep,
  setBillPaymentPayload,
} from "../../../../../store/slice/billPaymentSlice";
import { useAppDispatch } from "../../../../../hooks";
const ElectricityPackage = () => {
  const { selectedElectricityProvider } = useSelector(selectBillPayment);
  const dispatch = useAppDispatch();

  const handleNavigate = (title: string) => {
    dispatch(setBillpaymentCurrentStep(5));
    dispatch(setBillPaymentPayload({ vendType: title }));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Electricity Package
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select the package you want to buy from
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {electricityType?.map((option: any, index) => (
          <div
            className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            key={index}
            onClick={() => handleNavigate(option?.title)}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                  {selectedElectricityProvider?.description +
                    " " +
                    option?.title}
                </h2>
              </div>
              <ArrowRightIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ElectricityPackage;
