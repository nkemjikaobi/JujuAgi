import React from "react";

import { TabProp } from "../organisms/auth/AuthenticatedComponent/AuthenticatedComponent";

interface TabsSelectorProps {
  tabs: TabProp[];
  active: number;
  setActive: (id: number) => void;
}

const TabsSelector: React.FC<TabsSelectorProps> = ({ tabs, active, setActive }) => {
  return (
    <div className="bg-juju-gray-200 w-full h-fit p-2 flex rounded-[0.75rem]">
      {tabs.map((tab) => (
        <div
          className={`cursor-pointer flex items-center justify-center w-[12.813rem] h-[2.5rem] ${
            active === tab.id ? "bg-white rounded-[0.625rem] text-juju-black-300 duration-500 ease-in " : "text-juju-gray-100 ease-out duration-500 "
          }`}
          key={tab.id}
          onClick={() => setActive(tab.id)}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
};

export default TabsSelector;
