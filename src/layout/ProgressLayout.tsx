import { NavLink, Outlet, useLocation } from "react-router-dom";
import { ProgressProps, ProgressStepsProps } from "../interfaces/Global";
import { KBrandIcon } from "../assets/svg/Alert";
import { useKybDetailsQuery } from "../service/kyb";
import { setKYBDetails } from "../store/slice/authSlice";
import { useEffect } from "react";
import { useAppDispatch } from "../hooks";
import {useNavigate} from "react-router-dom"

const ProgressLayout = ({ progressSteps }: ProgressProps) => {
  const location = useLocation();
  const currentStep = location.pathname.split("/")[2];
const navigate = useNavigate()
  const { data } = useKybDetailsQuery({});
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setKYBDetails(data?.data));
  }, [data]);
  console.log(data);

  return (
    <div className="bg-pryColor-Light w-full border flex flex-col gap-5 justify-center items-center py-6 px-32 h-screen">
      <KBrandIcon />
      <p className="text-secColor font-semibold cursor-pointer text-bricolage text-lg" onClick={() => navigate("/dashboard")}>Click Here To Go To Dashboard</p>
      <div className="border px-24 py-14 bg-white w-full flex relative h-[80vh]">
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
                <p className={`font-workSans font-normal ${currentStep === progress.link && "text-pryColor font-semibold"}`}>{progress.title}</p>
              </NavLink>
            </div>
          ))}
        </div>

        <div className="w-[65%] overflow-y-auto ml-[50%] h-full px-6">
          <Outlet />
      
        </div>

      </div>
    </div>
  );
};

export default ProgressLayout;
