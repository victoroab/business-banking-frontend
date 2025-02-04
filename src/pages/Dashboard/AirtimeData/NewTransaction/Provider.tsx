import { ArrowRightIcon } from "../../../../assets/svg/CustomSVGs";
import { useAppDispatch } from "../../../../hooks";
// import { useGetAllAirtimeProvidersQuery } from "../../../../service/billPayment";
import {
  // setAirtimeBundlePayload,
  setAirtimeDataCurrentStep,
} from "../../../../store/slice/billPaymentSlice";
import { dataProvider } from "../../../../utils";

const Provider = () => {
  // const { data } = useGetAllAirtimeProvidersQuery();
  const dispatch = useAppDispatch();
  // const dispatch = useAppDispatch();
  const handleNavigate = (name: string, id: string) => {
    console.log(name, id);
    dispatch(setAirtimeDataCurrentStep(4));
    // dispatch(setAirtimeBundlePayload({ serviceCategoryId: id, network: name }));
    // dispatch(setAirtimeDataCurrentStep(4));
  };

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
        {dataProvider?.map((option: any) => (
          <div
            className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            key={option?.serviceCategoryId}
            onClick={() => handleNavigate(option?.name, option?.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                {/* <img
                  src={option?.logoUrl}
                  alt=""
                  className="h-6 w-6 rounded-full"
                /> */}
                {<option.icon />}
                <h2 className="text-base font-medium text-lightGreyColor m-0 font-workSans">
                  {option?.title}
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

export default Provider;
