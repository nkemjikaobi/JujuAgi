import React from "react";
import AuthenticatedComponent from "@/app/components/organisms/AuthenticatedComponent/AuthenticatedComponent";

export const metadata = {
  title: "JujuAGI - Authentication",
};

const AuthenticationPage = () => {
  return (
    <div className="">
      <AuthenticatedComponent />
    </div>
  );
};

export default AuthenticationPage;
