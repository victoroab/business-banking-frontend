import { payBillOptions } from "../../../../utils";
import { IDOption } from "../../../../interfaces/Global";
import { ArrowRightIcon } from "../../../../assets/svg/CustomSVGs";
import { useDispatch } from "react-redux";
import { setBillCategoryAction } from "../../../../store/slice/dashboardSlice";
import { setBillpaymentCurrentStep } from "../../../../store/slice/billPaymentSlice";

const Category = () => {
  const dispatch = useDispatch();
  const handleNavigate = (title: string) => {
    dispatch(setBillCategoryAction(title));
    dispatch(setBillpaymentCurrentStep(3));
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
          Category
        </h3>
        <p className="text-greyColr font-workSans leading-4 font-normal text-sm">
          Select bill category
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {payBillOptions.map((option: IDOption, index) => (
          <div
            className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            key={index}
            onClick={() => handleNavigate(option?.title)}
          >
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
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

export default Category;
