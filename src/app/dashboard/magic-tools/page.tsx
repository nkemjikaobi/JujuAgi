import MagicToolsComponent from "@/app/components/organisms/dashboard/magicTools/MagicToolsComponent/MagicToolsComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Magic Tools",
};

const MagicToolsPage = () => {
  return (
    <div className="p-2 smallLaptop:p-6">
      <MagicToolsComponent />
    </div>
  );
};

export default MagicToolsPage;
