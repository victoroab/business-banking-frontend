import React from "react";

import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import { NavListIcon } from "../../assets/svg/CustomSVGs";

const Sidebar = () => {
  return (
    <main className=" sidebarContainer py-8 flex flex-col gap-10 px-10">
      <div className="flex gap-2 item-center ">
        <NavListIcon />
        <h1 className="font-bold text-base text-pryColor font-bricolage m-0 p-1">
          Alert Business
        </h1>
      </div>
      <section className=" w-full mx-auto flex flex-col">
        <ul className="flex flex-col gap-8">
          {SidebarData.map(({ id, url, title, icon }) => (
            <React.Fragment key={id}>
              <NavLink
                key={id}
                to={url}
                className={({ isActive }) =>
                  isActive
                    ? "bg-gray-50 border border-gray-200 font-normal text-[var(--secColor)] rounded-md"
                    : "text-[#8E949A] font-normal"
                }
              >
                <hgroup className=" flex gap-4 items-center p-3">
                  <h4>{icon} </h4>
                  <p>{title}</p>
                </hgroup>
              </NavLink>
            </React.Fragment>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default Sidebar;
