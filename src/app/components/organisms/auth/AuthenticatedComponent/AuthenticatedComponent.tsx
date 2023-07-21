"use client";
import ContinueWithGoogleButton from "@/app/components/atoms/ContinueWithGoogleButton/ContinueWithGoogleButton";
import Logo from "@/app/components/atoms/Logo/Logo";
import Login from "@/app/components/organisms/auth/Login/Login";
import Register from "@/app/components/organisms/auth/Register/Register";
import TabsSelector from "@/app/components/TabsSelector/TabsSelector";
import Image from "next/image";
import React, { useState } from "react";

export interface TabProp {
  id: number;
  label: string;
  component: React.ReactNode;
}

const AuthenticatedComponent = () => {
  const [active, setActive] = useState<number>(1);

  const tabs: TabProp[] = [
    {
      id: 1,
      label: "Sign In",
      component: <Login setActive={setActive} />,
    },
    {
      id: 2,
      label: "Create Account",
      component: <Register setActive={setActive} />,
    },
  ];

  return (
    <div className="flex bg-white min-h-screen h-auto">
      <div className="relative w-[38.813rem] smallLaptop:w-[50%] bigLaptop:w-[38.813rem] television:w-[45%] min-h-screen h-auto hidden smallLaptop:block">
        <Image alt="Unlock the power of AI" fill priority={true} src="/images/auth/auth-bg.png" />
      </div>
      <div className="bigLaptop:px-[12.5rem] pt-24 py-16 smallLaptop:max-w-[50%] bigLaptop:max-w-[60%] mx-auto">
        <div className="flex items-center smallLaptop:justify-center cursor-pointer smallLaptop:mb-[2.5rem]">
          <Logo theme="dark" />
        </div>
        <div className="hidden smallLaptop:block">
          <TabsSelector active={active} setActive={setActive} tabs={tabs} />
        </div>
        <div className="hidden smallLaptop:block">
          <ContinueWithGoogleButton />
        </div>
        <div className="items-center space-x-4 my-8 hidden smallLaptop:flex">
          <div className="w-full h-[0.063rem] bg-juju-gray-100" />
          <span>OR</span>
          <div className="w-full h-[0.063rem] bg-juju-gray-100" />
        </div>

        <div className="">{active && tabs[active - 1]?.component}</div>
      </div>
    </div>
  );
};

export default AuthenticatedComponent;
