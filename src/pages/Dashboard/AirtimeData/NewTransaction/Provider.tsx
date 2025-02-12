import { ArrowRightIcon } from "../../../../assets/svg/CustomSVGs";
import Spinner from "../../../../components/Spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import {
  useGetAllAirtimeProvidersQuery,
  useGetAllInternetProvidersQuery,
} from "../../../../service/billPayment";
import {
  selectBillPayment,
  setAirtimeBundlePayload,
  setAirtimeDataCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
// import { dataProvider } from "../../../../utils";

const Provider = () => {
  const { data: airtime, isLoading: loadingAirtime } =
    useGetAllAirtimeProvidersQuery();
  const { data: bundle, isLoading: loadingBundle } =
    useGetAllInternetProvidersQuery();
  const { airtimeDataAction } = useAppSelector(selectBillPayment);
  const dispatch = useAppDispatch();

  const handleNavigate = (name: string, id: string) => {
    dispatch(setAirtimeBundlePayload({ serviceCategoryId: id, network: name }));
    airtimeDataAction === "DATA"
      ? dispatch(setAirtimeDataCurrentStep(3))
      : dispatch(setAirtimeDataCurrentStep(4));
  };
  const data = airtimeDataAction === "DATA" ? bundle : airtime;
  const isLoading =
    airtimeDataAction === "DATA" ? loadingBundle : loadingAirtime;
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Provider
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select the provider you want to buy from
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              {data?.data?.map((option: any) => (
                <div
                  className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
                  style={{
                    boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)",
                  }}
                  key={option?.serviceCategoryId}
                  onClick={() =>
                    handleNavigate(
                      option?.identifier,
                      option?.serviceCategoryId
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2 items-center">
                      <img
                        src={option?.logo}
                        alt=""
                        className="h-6 w-6 rounded-full"
                      />
                      {/* {<option.icon />} */}
                      <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                        {option?.name}
                      </h2>
                    </div>
                    <ArrowRightIcon />
                  </div>
                </div>
              ))}
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Provider;
