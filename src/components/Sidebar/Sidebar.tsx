import { SidebarData } from "./SidebarData";
import { LogoutIcon } from "../../assets/svg/CustomSVGs";
import { AlertLogoIcon } from "../../assets/svg/Sidebar";
import SubMenu from "./SubMenu";
import { useNavigate } from "react-router-dom";
import { LogoutUser } from "../../utils";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <main className=" sidebarContainer py-8 flex flex-col gap-6 pl-6 pr-2 h-full justify-between">
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 item-center ">
          <AlertLogoIcon />
          <h1 className="font-bold text-base text-pryColor font-bricolage m-0 p-1">
            Alert Business
          </h1>
        </div>
        <section className=" w-full mx-auto flex flex-col h-[80%]">
          <ul className="flex flex-col gap-1 h-full">
            {SidebarData.map((item) => (
              <SubMenu item={item} key={item.id} />
            ))}
          </ul>
        </section>
      </div>

      <div onClick={() => LogoutUser(navigate)} className="cursor-pointer">
        <hgroup className=" flex gap-4 items-center p-3">
          <h4>
            <LogoutIcon />{" "}
          </h4>
          <p className="font-workSans text-nagative">Logout</p>
        </hgroup>
      </div>
    </main>
  );
};

export default Sidebar;
