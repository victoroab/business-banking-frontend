import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { SidebarDataProps, SidebarItemProps } from "../../interfaces/Global";
import {} from "../../assets/svg/Auth";
import {
  SidebarArrowDownIcon,
  WhiteArrowUpIcon,
} from "../../assets/svg/PayBill";

const SubMenu = ({ item }: SidebarItemProps) => {
  const [isSubNavOpen, setIsSubNavOpen] = useState<boolean>(false);
  const showSubnav = () => setIsSubNavOpen(!isSubNavOpen);
  const [selectedTab, setSelectedTab] = useState<string>("");
  return (
    <React.Fragment key={item.id}>
      <NavLink
        key={item.id}
        onClick={item.subNav && showSubnav}
        to={item.url}
        className={({ isActive }) =>
          isActive
            ? "bg-pryColor font-normal text-white rounded-xl"
            : "text-greyColr font-normal"
        }
      >
        {({ isActive }) => (
          <hgroup className=" flex justify-between items-center  p-3">
            <div className="flex gap-4 items-center">
              {<item.icon fillColor={isActive ? "white" : "#352F36"} />}
              <p className="font-workSans">{item.title}</p>
            </div>

            <div className="">
              {item.subNav && (
                <>
                  {isSubNavOpen ? (
                    <WhiteArrowUpIcon
                      fillColor={isActive ? "white" : "#352F36"}
                    />
                  ) : (
                    <SidebarArrowDownIcon
                      fillColor={isActive ? "white" : "#352F36"}
                    />
                  )}
                </>
              )}
            </div>
          </hgroup>
        )}
      </NavLink>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out transform ${
          isSubNavOpen
            ? "max-h-screen opacity-100 translate-y-0 pl-5 border-l-2 border-[#F6F6F6] ml-5"
            : "max-h-0 opacity-0 translate-y-4"
        }`}
      >
        {isSubNavOpen && (
          <>
            {item?.subNav?.map((item: SidebarDataProps) => (
              <React.Fragment key={item.id}>
                <NavLink
                  key={item.id}
                  to={item.url}
                  onClick={() => setSelectedTab(item.id)}
                  className={({ isActive }) =>
                    isActive
                      ? "font-medium text-pryColor rounded-lg"
                      : "text-greyColr font-medium"
                  }
                >
                  <hgroup
                    className={` flex gap-4 items-center${
                      selectedTab === item.id
                        ? "border bg-[#f7f8ff] rounded-lg py-2 px-3"
                        : "border px-3 py-2"
                    }`}
                  >
                    <p className="font-workSans text-sm">{item.title}</p>
                  </hgroup>
                </NavLink>
              </React.Fragment>
            ))}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default SubMenu;
