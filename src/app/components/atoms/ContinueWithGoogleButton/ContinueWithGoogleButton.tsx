import { ButtonProperties } from "@/app/libs/helpers";
import React from "react";

import CustomButton from "../CustomButton/CustomButton";

const ContinueWithGoogleButton = () => {
  return (
    <div>
      <CustomButton
        customClass="w-full bg-white border-[0.125rem] rounded-[0.75rem] mt-8 text-12 smallLatop:text-18 font-bold !text-juju-black-100 border-juju-gray-300 hover:!bg-gray-100"
        handleClick={() => {}}
        icon="google"
        size={ButtonProperties.SIZES.full}
        title="Continue with Google"
        type="submit"
        variant={ButtonProperties.VARIANT.primary.name}
      />
    </div>
  );
};

export default ContinueWithGoogleButton;
