"use client";
import { usePathname } from "next/navigation";
import React from "react";

import CustomLink from "../CustomLink/CustomLink";
import Icon from "../Icons";

const BottomNavigation = () => {
  const pathname = usePathname();

  const data = [
    {
      id: 1,
      name: "explore",
      route: "/dashboard/explore",
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
    {
      id: 5,
      name: "profile",
      route: "/dashboard/profile",
      icon: "user",
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 bg-white w-full h-16  py-3 grid grid-cols-5 items-center">
      {data.map((item) => (
        <CustomLink customClass="flex items-center justify-center flex-col" destination={item.route} key={item.id}>
          <Icon className="mb-2" name={item.icon} />
          <p className={`font-medium text-10 capitalize ${pathname === item.route ? "text-juju-purple-500" : "text-[#A1A5B7]"}`}>{item.name}</p>
        </CustomLink>
      ))}
    </div>
  );
};

export default BottomNavigation;
