import Link from "next/link";
import { ReactNode } from "react";

export interface CustomLinkProps {
  destination: string;
  children: ReactNode;
  customClass?: string;
  onClick?: () => void;
}

const CustomLink = ({ children, destination, customClass = "", onClick }: CustomLinkProps) => {
  const hoverStyle = "hover:text-juju-purple-500";
  return (
    <Link href={destination} onClick={onClick}>
      <div className={`cursor-pointer ${hoverStyle} ${customClass}`}>{children}</div>
    </Link>
  );
};

export default CustomLink;
