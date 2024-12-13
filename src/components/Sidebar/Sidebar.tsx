import React from "react";

import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import { LogoutIcon } from "../../assets/svg/CustomSVGs";
import { AlertLogoIcon } from "../../assets/svg/Sidebar";

const Sidebar = () => {
  return (
    <main className=" sidebarContainer py-8 flex flex-col gap-20 px-6 h-full justify-between">
      <div className="flex flex-col gap-10">
        <div className="flex gap-2 item-center ">
          <AlertLogoIcon />
          <h1 className="font-bold text-base text-pryColor font-bricolage m-0 p-1">
            Alert Business
          </h1>
        </div>
        <section className=" w-full mx-auto flex flex-col h-[80%]">
          <ul className="flex flex-col gap-6 h-full">
            {SidebarData.map(({ id, url, title, icon }) => (
              <React.Fragment key={id}>
                <NavLink
                  key={id}
                  to={url}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-gray-50 border border-gray-200 font-normal text-[var(--secColor)] rounded-xl"
                      : "text-[#8E949A] font-normal"
                  }
                >
                  <hgroup className=" flex gap-4 items-center p-3">
                    <h4>{icon} </h4>
                    <p className="font-workSans">{title}</p>
                  </hgroup>
                </NavLink>
              </React.Fragment>
            ))}
          </ul>
        </section>
      </div>

      <div className="mt-auto">
        <NavLink to={"/logout"}>
          <hgroup className=" flex gap-4 items-center p-3">
            <h4>
              <LogoutIcon />{" "}
            </h4>
            <p className="font-workSans text-nagative">Logout</p>
          </hgroup>
        </NavLink>
      </div>
    </main>
  );
};

export default Sidebar;
