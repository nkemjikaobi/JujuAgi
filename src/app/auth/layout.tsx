import Logo from "@/app/components/atoms/Logo/Logo";
import Image from "next/image";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex bg-white min-h-screen h-auto">
      <div className="relative w-[38.813rem] smallLaptop:w-[50%] bigLaptop:w-[38.813rem] television:w-[45%] min-h-screen h-auto hidden smallLaptop:block">
        <Image alt="Unlock the power of AI" fill priority={true} src="/images/auth/auth-bg.png" />
      </div>
      <div className="bigLaptop:px-[12.5rem] pt-48 py-16 smallLaptop:max-w-[50%] bigLaptop:max-w-[60%] mx-auto">
        <div className="flex items-center justify-center cursor-pointer mb-[2.5rem]">
          <Logo theme="dark" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
