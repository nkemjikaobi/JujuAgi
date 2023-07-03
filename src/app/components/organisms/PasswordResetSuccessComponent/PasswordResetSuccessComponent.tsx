"use client";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import { ButtonProperties } from "@/app/libs/helpers";
import { useRouter } from "next/navigation";
import React from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";
yupPassword(yup); // extend yup

const PasswordResetSuccessComponent = () => {
  const router = useRouter();

  return (
    <AnimateContainer.fadeIn>
      <div>
        <div className="flex items-center mb-8">
          <h3 className="text-24 font-medium text-juju-black-100">Password reset successful</h3>
        </div>
        <div className="flex flex-col justify-center items-center mt-[2.5rem]">
          <CustomButton
            customClass="w-full rounded-[0.75rem]"
            handleClick={() => router.push("/")}
            size={ButtonProperties.SIZES.big}
            title="Go to Login"
            type="submit"
            variant={ButtonProperties.VARIANT.primary.name}
          />
        </div>
      </div>
    </AnimateContainer.fadeIn>
  );
};

export default PasswordResetSuccessComponent;
