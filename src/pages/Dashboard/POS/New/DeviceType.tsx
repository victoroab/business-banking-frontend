import { setPosSelectedCategory } from "../../../../store/slice/dashboardSlice";
import { useAppDispatch } from "../../../../hooks";
// import { useNavigate } from "react-router-dom";
import { posDevice } from "../../../../utils";
import { IDOption } from "../../../../interfaces/Global";
import { ArrowRightIcon } from "../../../../assets/svg/CustomSVGs";
import { setPosCurrentStep } from "../../../../store/slice/posSlice";

const DeviceType = () => {
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const handleNavigate = (title: string) => {
    dispatch(setPosSelectedCategory(title));
    dispatch(setPosCurrentStep(3));
    // navigate("/request-pos/pos-details");
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
        {posDevice.map((option: IDOption, index) => (
          <div
            className="account-option flex flex-col cursor-pointer rounded-xl p-6 gap-4"
            style={{ boxShadow: "0px 1px 5px 2px rgba(216, 216, 216, 0.2)" }}
            key={index}
            onClick={() => handleNavigate(option?.title)}
          >
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-2">
                <h2 className="text-base font-medium text-lightGreyColor font-workSans">
                  {option?.title}
                </h2>
                <p className="text-positive text-xs">{option?.shortCode}</p>
              </div>
              <ArrowRightIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeviceType;
