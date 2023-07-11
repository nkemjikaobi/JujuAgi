import AuthenticatedComponent from "@/app/components/organisms/auth/AuthenticatedComponent/AuthenticatedComponent";
import React from "react";

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
