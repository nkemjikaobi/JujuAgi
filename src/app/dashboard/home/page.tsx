// import ForgotPasswordComponent from "@/app/components/organisms/ForgotPasswordComponent/ForgotPasswordComponent";
import HomeComponent from "@/app/components/organisms/dashboard/Home/HomeComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Home",
};

const DashboardHomePage = () => {
  return (
    <div className="bg-black text-white min-h-screen h-auto p-4 smallLaptop:p-6 overflow-y-scrol">
      <HomeComponent />
    </div>
  );
};

export default DashboardHomePage;
