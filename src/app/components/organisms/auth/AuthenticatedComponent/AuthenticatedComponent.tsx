"use client";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import Logo from "@/app/components/atoms/Logo/Logo";
import Login from "@/app/components/organisms/auth/Login/Login";
import Register from "@/app/components/organisms/auth/Register/Register";
import TabsSelector from "@/app/components/TabsSelector/TabsSelector";
import { ButtonProperties } from "@/app/libs/helpers";
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
      component: <Login />,
    },
    {
      id: 2,
      label: "Create Account",
      component: <Register />,
    },
  ];

  return (
    <div className="flex bg-white">
      <div className="relative w-[38.813rem] smallLaptop:w-[50%] bigLaptop:w-[38.813rem] television:w-[45%] min-h-screen h-auto">
        <Image alt="Unlock the power of AI" fill priority={true} src="/images/auth/auth-bg.png" />
      </div>
      <div className="bigLaptop:px-[12.5rem] pt-24 py-16 smallLaptop:max-w-[50%] bigLaptop:max-w-[60%] mx-auto">
        <div className="flex items-center justify-center cursor-pointer mb-[2.5rem]">
          <Logo theme="dark" />
        </div>
        <TabsSelector active={active} setActive={setActive} tabs={tabs} />
        <CustomButton
          customClass="w-full bg-white border-[0.125rem] rounded-[0.75rem] mt-8 text-18 font-bold !text-juju-black-100 border-juju-gray-300 hover:!bg-gray-100"
          handleClick={() => {}}
          icon="google"
          size={ButtonProperties.SIZES.full}
          title="Continue with Google"
          type="submit"
          variant={ButtonProperties.VARIANT.primary.name}
        />
        <div className="flex items-center space-x-4 my-8">
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
