import { ArrowRightIcon } from "../../../../../assets/svg/CustomSVGs";
import { useGetAllCableTVProvidersQuery } from "../../../../../service/billPayment";
import { saveElectricityProvider } from "../../../../../store/slice/globalSlice";
import {
  setBillpaymentCurrentStep,
  setBillPaymentPayload,
} from "../../../../../store/slice/billPaymentSlice";
import { useAppDispatch } from "../../../../../hooks";
import Spinner from "../../../../../components/Spinner/Spinner";

const CableProvider = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const handleNavigate = (name: string, category: string) => {
    dispatch(saveElectricityProvider(name));
    dispatch(setBillpaymentCurrentStep(4));
    dispatch(
      setBillPaymentPayload({ provider: name, serviceCategoryId: category })
    );
  };
  const { data, isLoading } = useGetAllCableTVProvidersQuery({});
  console.log(data);
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Cable Provider
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
            {data?.data.map((option: any, index: number) => (
              <div
                className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
                style={{
                  boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                }}
                key={index}
                onClick={() =>
                  handleNavigate(option?.identifier, option?.serviceCategoryId)
                }
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
                    {/* {<option.icon />} */}
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

export default CableProvider;
