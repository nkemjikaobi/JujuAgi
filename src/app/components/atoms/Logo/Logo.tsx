import { useWindowSize } from "@/app/hooks/useWindowSize";
import React from "react";

import Icon from "../Icons";

interface LogoProps {
  theme?: "light" | "dark";
}

const Logo = ({ theme = "light" }: LogoProps) => {
  const [width] = useWindowSize();

  const imageWidth = width > 768 ? "" : "w-32";
  const imageHeight = width > 768 ? "" : "h-16";

  return <>{theme === "dark" ? <Icon className={`${imageHeight} ${imageWidth}`} name="newDarkLogo" /> : <Icon className={`${imageHeight} ${imageWidth}`} name="newWhiteLogo" />}</>;
};

export default Logo;
