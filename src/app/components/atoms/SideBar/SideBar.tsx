"use client";
import CustomLink from "@/app/components/atoms/CustomLink/CustomLink";
import Icon from "@/app/components/atoms/Icons";
import Logo from "@/app/components/atoms/Logo/Logo";
import { composeClasses } from "@/app/libs/helpers";
import { AppState } from "@/app/store/rootReducer";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

interface SideBarProps {
  setShowSidebar: (visibility: boolean) => void;
}

const SideBar: React.FC<SideBarProps> = ({ setShowSidebar }) => {
  const pathname = usePathname();
  const { currentUser } = useSelector((state: AppState) => state.auth);

  const sideBarItems = [
    {
      id: 1,
      name: "home",
      route: "/dashboard/home",
      icon: "compass",
    },
    {
      id: 2,
      name: "juju chat",
      route: "/dashboard/juju-chat",
      icon: "chat",
    },
    {
      id: 3,
      name: "magic tools",
      route: "/dashboard/magic-tools",
      icon: "magic",
    },
    {
      id: 4,
      name: "saved",
      route: "/dashboard/saved",
      icon: "folder",
    },
  ];

  return (
    <div className="bg-black h-screen text-juju-gray-50 smallLaptop:opacity-90 px-6 py-6 relative flex flex-col">
      <Logo />
      <div className="mt-16 h-[75%] flex-1">
        {sideBarItems.map((item) => (
          <CustomLink
            customClass={composeClasses(
              "flex items-center capitalize space-x-[1.25rem] mb-8 px-4",
              pathname === item.route ? "bg-juju-purple-500 py-3 w-[15.5rem] h-12 rounded-[0.5rem] hover:!text-white" : ""
            )}
            destination={item.route}
            key={item.id}
            onClick={() => setShowSidebar(false)}
          >
            <Icon name={item.icon} />
            <p className="">{item.name}</p>
          </CustomLink>
        ))}
      </div>
      <div className="bg-black rounded-[0.75rem] p-[0.625rem] min-w-full h-[7.75rem] mt-auto">
        {/* <div className="absolute bottom-5 bg-black rounded-[12px] p-[10px] min-w-full h-[124px]"> */}
        <div className="flex items-center">
          <div className="w-[2.5rem] h-[2.5rem] rounded-full bg-[url('/images/sidebar/dp.png')] mr-4" />
          <div>
            <h4 className="text-14 font-medium capitalize">
              {currentUser?.firstName} {currentUser?.lastName}
            </h4>
            <p className="text-12 font-medium text-juju-gray-300 opacity-50">{currentUser?.email}</p>
          </div>
          {/* <div className="capitalize text-juju-black-100 flex items-center justify-center font-bold text-12 w-12 h-6 rounded-lg bg-juju-purple-500 ml-4">free</div> */}
        </div>
        {/* <div className="w-full h-12 rounded-xl text-juju-gray-50 font-medium text-14 flex items-center justify-center border-[2px] border-juju-black-200 mt-2">Upgraded to Pro</div> */}
      </div>
    </div>
  );
};

export default SideBar;
