import { getSanitizedHtml } from "@/app/libs/helpers";
import React, { FC } from "react";

import CustomLink from "../CustomLink/CustomLink";

export interface BreadCrumbProps {
  text?: string;
  url?: string;
}

interface CustomBreadCrumbProps {
  breadCrumbs?: Array<BreadCrumbProps>;
}
const CustomBreadCrumb: FC<CustomBreadCrumbProps> = ({ breadCrumbs = [] }) => {
  return (
    <div className="flex items-center text-18 font-medium">
      {breadCrumbs &&
        Object.entries(breadCrumbs).map(([index, breadCrumb]) => {
          if (parseInt(index) === Object.entries(breadCrumbs).length - 1) {
            return <div className="capitalize text-juju-gray-700" dangerouslySetInnerHTML={getSanitizedHtml(breadCrumb.text ? breadCrumb.text : "")} key={breadCrumb.text} />;
          }
          return (
            <div className="mr-2 flex items-center" key={breadCrumb.text}>
              <div className="mr-2 capitalize">
                <CustomLink destination={breadCrumb.url ? breadCrumb.url : "#"}>{breadCrumb.text ? breadCrumb.text : ""}</CustomLink>
              </div>
              /
            </div>
          );
        })}
    </div>
  );
};

export default CustomBreadCrumb;
