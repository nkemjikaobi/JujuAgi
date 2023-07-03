import Link from "next/link";
import { ReactNode } from "react";

export interface CustomLinkProps {
  destination: string;
  children: ReactNode;
  customClass?: string;
}

const CustomLink = ({ children, destination, customClass = "" }: CustomLinkProps) => {
  const hoverStyle = "hover:text-juju-purple-500";
  return (
    <Link href={destination}>
      <div className={`cursor-pointer ${hoverStyle} ${customClass}`}>{children}</div>
    </Link>
  );
};

export default CustomLink;
