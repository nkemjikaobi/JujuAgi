import React from "react";
import AuthenticatedComponent from "@/app/components/organisms/AuthenticatedComponent/AuthenticatedComponent";
import ForgotPasswordComponent from "@/app/components/organisms/ForgotPasswordComponent/ForgotPasswordComponent";

export const metadata = {
  title: "JujuAGI - Forgot Password",
};

const AuthenticationPage = () => {
  return (
    <div className="">
      <ForgotPasswordComponent />
    </div>
  );
};

export default AuthenticationPage;
