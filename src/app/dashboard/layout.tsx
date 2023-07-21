"use client";
import BottomNavigation from "@/app/components/atoms/BottomNavigation/BottomNavigation";
import Icon from "@/app/components/atoms/Icons";
import SideBar from "@/app/components/atoms/SideBar/SideBar";
import useClickOutside from "@/app/hooks/useClickOutside";
import React, { useEffect, useState } from "react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  const node = useClickOutside(() => {
    setShowSidebar(false);
  });

  useEffect(() => {
    return () => {
      setShowSidebar(false);
    };
  }, []);

  return (
    <div className="flex">
      <div className="w-[20rem] hidden smallLaptop:block">
        <SideBar setShowSidebar={setShowSidebar} />
      </div>
      <div
        className={`w-[20rem] fixed left-0 z-50 smallLaptop:hidden duration-500 transform transition-transform ${showSidebar ? "translate-x-0" : "-translate-x-full"}`}
        ref={node}
      >
        <SideBar setShowSidebar={setShowSidebar} />
      </div>
      <div className="flex-1">
        <div className="p-4 mt-6 smallLaptop:hidden">
          <Icon className="cursor-pointer" name="hamburger" onClick={() => setShowSidebar(true)} />
        </div>
        {children}
      </div>
      <div className="smallLaptop:hidden">
        <BottomNavigation />
      </div>
    </div>
  );
};

export default DashboardLayout;
