import CustomAppWrapper from "@/app/components/atoms/CustomAppWrapper/CustomAppWrapper";
import React from "react";

const CustomAppWrapperProvider = ({ children }: React.PropsWithChildren) => {
  return <CustomAppWrapper>{children}</CustomAppWrapper>;
};

export default CustomAppWrapperProvider;
