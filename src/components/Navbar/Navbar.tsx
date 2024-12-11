import Switch from "../Switch/Swtich";
import { useAppDispatch } from "../../hooks";
import { saveAccountStatus } from "../../store/slice/globalSlice";
import { NotificationIcon } from "../../assets/svg/CustomSVGs";
import { NavbarProps } from "../../interfaces/Global";

const Navbar: React.FC<NavbarProps> = ({ title, subtitle }) => {
  const dispatch = useAppDispatch();
  const handleAccountToggle = (isLive: boolean) => {
    dispatch(saveAccountStatus(isLive ? "Live" : "Test"));
  };

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
        <Switch onToggle={handleAccountToggle} />
        <div className="rounded-full w-[47px] h-[47px] bg-[#ebeff2] flex items-center justify-center">
          <NotificationIcon />
        </div>

        <div className="flex gap-4 items-center">
          <div className="image">
            <img
              src={"https://via.placeholder.com/50"}
              alt="Uploaded Preview"
              className="w-12 h-12 rounded-full mr-4"
            />
          </div>
          <div className="flex flex-col">
            <p className=" font-semibold text-sm font-workSans text-greyColr">
              Bamidele Akinyemi
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
