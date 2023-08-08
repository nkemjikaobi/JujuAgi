import { composeClasses } from "@/app/libs/helpers";
import React from "react";

interface PageHeaderProps {
  title: string;
  subTitle?: string;
  titleClass?: string;
  subTitleClass?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subTitle = "", titleClass = "", subTitleClass = "" }) => {
  return (
    <div className="mb-[2.5rem]">
      <h1 className={composeClasses("font-bold text-juju-black-100 capitalize text-[28px] smallLaptop:text-[2.5rem] mb-1", titleClass)}>{title}</h1>
      {subTitle && <p className={composeClasses("text-14 smallLaptop:font-bold", subTitleClass)}>{subTitle}</p>}
    </div>
  );
};

export default PageHeader;
