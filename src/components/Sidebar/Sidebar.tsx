import React, { useState } from "react";

import { SidebarData } from "./SidebarData";
import { NavLink } from "react-router-dom";
import { LogoutIcon } from "../../assets/svg/CustomSVGs";
import {
  AlertLogoIcon,
  SendMoneyIcon,
  UploadIcon,
} from "../../assets/svg/Sidebar";

const Sidebar = () => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(false);

  const showSubnav = () => setIsSubNavOpen(!isSubNavOpen);

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
            {SidebarData.map((link) => (
              <React.Fragment key={link.id}>
                <NavLink
                  key={link.id}
                  onClick={link.subNav && showSubnav}
                  to={link.url}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-pryColor font-normal text-white rounded-xl"
                      : "text-greyColr font-normal"
                  }
                >
                  {({ isActive }) => (
                    <hgroup className=" flex gap-4 items-center p-3">
                      {<link.icon fillColor={isActive ? "white" : "#352F36"} />}
                      <p className="font-workSans">{link.title}</p>
                      <div className="border">
                        {link.subNav && (
                          <>
                            {isSubNavOpen ? <UploadIcon /> : <SendMoneyIcon />}
                          </>
                        )}
                      </div>
                    </hgroup>
                  )}
                </NavLink>

                {isSubNavOpen &&
                  link?.subNav?.map((link) => (
                    <React.Fragment key={link.id}>
                      <NavLink
                        key={link.id}
                        to={link.url}
                        className={({ isActive }) =>
                          isActive
                            ? "bg-[#f7f8ff] font-medium text-pryColor rounded-lg"
                            : "text-greyColr font-medium"
                        }
                      >
                        <hgroup className=" flex gap-4 items-center p-2 pl-10">
                          <p className="font-workSans text-sm">{link.title}</p>
                        </hgroup>
                      </NavLink>
                    </React.Fragment>
                  ))}
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
