import Image from "next/image";
import React from "react";
import Icon from "@/app/components/atoms/Icons";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex bg-white">
      <div className="relative w-[38.813rem] smallLaptop:w-[50%] bigLaptop:w-[38.813rem] television:w-[45%] min-h-screen h-auto">
        <Image src="/images/auth/auth-bg.png" priority={true} fill alt="Unlock the power of AI" />
      </div>
      <div className="bigLaptop:px-[12.5rem] pt-24 py-16 smallLaptop:max-w-[50%] bigLaptop:max-w-[60%] mx-auto">
        <div className="flex items-center justify-center cursor-pointer mb-[2.5rem]">
          <Icon name="logo" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
