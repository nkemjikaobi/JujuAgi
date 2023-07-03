import React from "react";

import Icon from "../Icons";

interface LogoProps {
  theme?: "light" | "dark";
}

const Logo = ({ theme = "light" }: LogoProps) => {
  return <>{theme === "dark" ? <Icon name="darkLogo" /> : <Icon name="whiteLogo" />}</>;
};

export default Logo;
