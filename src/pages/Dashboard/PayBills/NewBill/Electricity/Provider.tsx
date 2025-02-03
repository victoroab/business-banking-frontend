import { ArrowRightIcon } from "../../../../../assets/svg/CustomSVGs";
import { IDOption } from "../../../../../interfaces/Global";
import { electricityProvider } from "../../../../../utils";
import { saveElectricityProvider } from "../../../../../store/slice/globalSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAllElectricityProvidersQuery } from "../../../../../service/billPayment";

const ElectricityProvider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNavigate = (title: string) => {
    dispatch(saveElectricityProvider(title));

    navigate("/utility/pay-new-bill/package");
  };
  const { data } = useGetAllElectricityProvidersQuery({});

  console.log(data);
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
        {electricityProvider.map((option: IDOption, index) => (
          <div
            className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            key={index}
            onClick={() => handleNavigate(option?.title)}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
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

export default ElectricityProvider;
