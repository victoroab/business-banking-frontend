import { ArrowRightIcon } from "../../../../../assets/svg/CustomSVGs";
import { saveElectricityProvider } from "../../../../../store/slice/globalSlice";
import { useGetAllElectricityProvidersQuery } from "../../../../../service/billPayment";
import {
  setBillpaymentCurrentStep,
  setBillPaymentPayload,
  setSelectedElectricityProvider,
} from "../../../../../store/slice/billPaymentSlice";
import { useAppDispatch } from "../../../../../hooks";
import Spinner from "../../../../../components/Spinner/Spinner";

const ElectricityProvider = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const handleNavigate = (selectedProvider: any) => {
    dispatch(setSelectedElectricityProvider(selectedProvider));
    dispatch(setBillpaymentCurrentStep(4));
    dispatch(
      setBillPaymentPayload({
        serviceCategoryId: selectedProvider?.serviceCategoryId,
        meterType: selectedProvider?.name,
      })
    );
  };
  const { data, isLoading } = useGetAllElectricityProvidersQuery({});
  console.log(data, "testting");
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Electricity Provider
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select the provider you want to buy from
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {data?.data?.map((option: any, index: number) => (
              <div
                className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
                style={{
                  boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                }}
                key={index}
                onClick={() => handleNavigate(option)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                      {option?.description}
                    </h2>
                  </div>
                  <ArrowRightIcon />
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default ElectricityProvider;
