import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import React from "react";

import MagicToolsListing from "../MagicToolsListing/MagicToolsListing";

const MagicToolsComponent = () => {
  return (
    <div className="border border-juju-gray-600 p-6 min-h-[80vh]">
      <PageHeader subTitle="Favorite tools from the community" title="Magic Tools" />
      <MagicToolsListing />
    </div>
  );
};

export default MagicToolsComponent;
