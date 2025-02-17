import { ArrowRightIcon } from "../../../../../assets/svg/CustomSVGs";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import {
  selectBillPayment,
  setBillpaymentCurrentStep,
} from "../../../../../store/slice/billPaymentSlice";
import { useAppDispatch } from "../../../../../hooks";
import { useGetAllCableTVPlanQuery } from "../../../../../service/billPayment";
import Spinner from "../../../../../components/Spinner/Spinner";
const CablePackage = () => {
  const { billPaymentPayload } = useSelector(selectBillPayment);
  // const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetAllCableTVPlanQuery(
    billPaymentPayload?.serviceCategoryId
  );
  // const selectedProviderPackages = electricityProvider?.find(
  //   (option: any) => selectedElectricityProvider === option?.title
  // );

  const handleNavigate = (title: string) => {
    console.log(title);
    dispatch(setBillpaymentCurrentStep(5));
    // navigate("/utility/pay-new-bill/beneficiary");
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
                onClick={() => handleNavigate(option?.nam)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-2 items-center">
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
      </div>
    </div>
  );
};

export default CablePackage;
