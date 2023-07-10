import React from "react";

interface PageHeaderProps {
  title: string;
  subTitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle = "" }) => {
  return (
    <div className="mb-[2.5rem]">
      <h1 className="font-bold text-juju-black-100 text-[2.5rem] mb-1">{title}</h1>
      {subTitle && <p className="text-14 font-bold text-juju-gray-500">{subTitle}</p>}
    </div>
  );
};

export default PageHeader;
