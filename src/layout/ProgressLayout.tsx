import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  ProgressProps,
  ProgressStepsProps,
  StepComponentProps,
} from "../interfaces/Global";
import { KBrandIcon } from "../assets/svg/Alert";
import { useKybDetailsQuery } from "../service/kyb";
import { setKYBDetails } from "../store/slice/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import { useNavigate } from "react-router-dom";

const ProgressLayout = ({
  progressSteps,
  isDashboard,
  stepsComponents,
  stateCurrentStep,
  setStateCurrentStep,
  isUpload,
}: ProgressProps) => {
  const location = useLocation();
  const currentStep = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const { data } = useKybDetailsQuery({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setKYBDetails(data?.data));
  }, [data, dispatch]);

  return (
    <>
      {isDashboard ? (
        <>
          <div className="px-24 py-14 bg-white w-full flex relative h-[80vh]">
            <div className="w-[40%] flex flex-col gap-10">
              {progressSteps.map((progress: ProgressStepsProps) => (
                <div className="flex" key={progress.id}>
                  <div
                    className={`w-[210px] items-center gap-2 border-b-2 flex pb-2 ${
                      stateCurrentStep === progress.id
                        ? "border-secColor"
                        : "border-[#e8e9eb]"
                    }`}
                  >
                    <div
                      className={`rounded-full px-1 w-[18px] h-[18px] flex items-center justify-center ${
                        stateCurrentStep === progress.id
                          ? "bg-secColor text-white"
                          : "bg-[#e8e9eb]"
                      }`}
                    >
                      <p className="text-sm">{progress.id}</p>
                    </div>
                    <p className="font-workSans font-normal">
                      {progress.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[60%] overflow-y-auto h-full px-4">
              {stepsComponents?.map(
                ({ step, component: Component }: StepComponentProps) =>
                  stateCurrentStep === step ? (
                    <Component
                      key={step}
                      setCurrentStep={setStateCurrentStep}
                    />
                  ) : null
              )}
            </div>
          </div>
        </>
      ) : isUpload ? (
        <>
          <div className="bg-pryColor-Light w-full flex flex-col gap-5 justify-center items-center h-[90vh] px-10">
            <div className="px-24 py-14 bg-white w-full flex relative h-[80vh]">
              <div className="w-[40%] flex flex-col gap-10">
                {progressSteps.map((progress: ProgressStepsProps) => (
                  <div className="flex" key={progress.id}>
                    <NavLink
                      key={progress.id}
                      to={progress.link as string}
                      className={({ isActive }) =>
                        isActive
                          ? "w-[210px] items-center gap-2 border-b-2 flex pb-2  border-secColor"
                          : "w-[210px] items-center gap-2 border-b-2 flex pb-2  border-[#e8e9eb]"
                      }
                    >
                      <div
                        className={`rounded-full px-1 w-[18px] h-[18px] flex items-center justify-center ${
                          currentStep === progress.link
                            ? "bg-secColor text-white"
                            : "bg-[#e8e9eb]"
                        }`}
                      >
                        <p className="text-sm">{progress.id}</p>
                      </div>
                      <p
                        className={`font-workSans font-normal ${
                          currentStep === progress.link &&
                          "text-pryColor font-semibold"
                        }`}
                      >
                        {progress.title}
                      </p>
                    </NavLink>
                  </div>
                ))}
              </div>

              <div className="w-[60%] overflow-y-auto h-full px-4">
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-pryColor-Light w-full flex flex-col gap-5 justify-center items-center py-6 h-screen px-32">
          <div className="flex flex-col gap-5 justify-center items-center">
            <KBrandIcon />
            <p
              className="text-secColor font-semibold cursor-pointer text-bricolage text-lg"
              onClick={() => navigate("/")}
            >
              Click Here To Go To Dashboard
            </p>
          </div>

          <div className="px-24 py-14 bg-white w-full flex relative h-[80vh]">
            <div className="w-[30%] flex flex-col gap-10 fixed">
              {progressSteps.map((progress: ProgressStepsProps) => (
                <div className="flex" key={progress.id}>
                  <NavLink
                    key={progress.id}
                    to={progress.link as string}
                    className={({ isActive }) =>
                      isActive
                        ? "w-[200px] items-center gap-2 border-b-2 flex pb-2  border-secColor"
                        : "w-[200px] items-center gap-2 border-b-2 flex pb-2  border-[#e8e9eb]"
                    }
                  >
                    <div
                      className={`rounded-full px-1 w-[18px] h-[18px] flex items-center justify-center ${
                        currentStep === progress.link
                          ? "bg-secColor text-white"
                          : "bg-[#e8e9eb]"
                      }`}
                    >
                      <p className="text-sm">{progress.id}</p>
                    </div>
                    <p
                      className={`font-workSans font-normal ${
                        currentStep === progress.link &&
                        "text-pryColor font-semibold"
                      }`}
                    >
                      {progress.title}
                    </p>
                  </NavLink>
                </div>
              ))}
            </div>

            <div className="w-[70%] overflow-y-auto ml-[50%] h-full px-4">
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProgressLayout;
