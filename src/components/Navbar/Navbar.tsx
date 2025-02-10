import Switch from "../Switch/Swtich";
import { useAppDispatch } from "../../hooks";
import { saveAccountStatus } from "../../store/slice/globalSlice";
import { NotificationIcon } from "../../assets/svg/CustomSVGs";
import { NavbarProps } from "../../interfaces/Global";
import { useUserProfileQuery } from "../../service/kyb";
import { useEffect, useState } from "react";
import { setUserDetails } from "../../store/slice/authSlice";

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const dispatch = useAppDispatch();
  const { data } = useUserProfileQuery({});

  const [isChecked, setIsChecked] = useState(false);
  const handleAccountToggle = (checked: boolean) => {
    setIsChecked(checked);
    dispatch(saveAccountStatus(checked ? "Live" : "Test"));
  };

  useEffect(() => {
    dispatch(setUserDetails(data?.data));
  }, [data, dispatch]);

  return (
    <div className="flex justify-between items-center p-10">
      <div className="flex flex-col gap-4">
        <h3 className="text-pryColor font-semibold text-[32px] font-bricolage leading-6">
          {title}
        </h3>
        <p className="text-lightGreyColor font-workSans leading-4 font-normal text-sm">
          {subtitle}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Switch onToggle={handleAccountToggle} isChecked={isChecked} />
        <div className="rounded-full w-[47px] h-[47px] bg-[#ebeff2] flex items-center justify-center">
          <NotificationIcon />
        </div>

        <div className="flex gap-4 items-center">
          <div className="image">
            {/* <img
              src={"https://via.placeholder.com/50"}
              alt="avatar"
              className="w-12 h-12 rounded-full mr-4"
            /> */}
            <div className="flex items-center justify-center w-[64px] h-[64px] bg-[#f1f2f3] p-4 rounded-full">
              <h3 className="text-pryColor font-semibold text-2xl font-bricolage leading-6">
                {data?.data?.firstName?.charAt(0) +
                  data?.data?.lastName?.charAt(0)}
              </h3>
            </div>
          </div>
          <div className="flex flex-col">
            <p className=" font-semibold text-sm font-workSans text-greyColr">
              {data?.data?.firstName + " " + data?.data?.lastName}
            </p>
            <div className="flex gap-1 items-center">
              <p className="text-lightGreyColor font-medium font-workSans text-xs">
                Bami & Co
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
