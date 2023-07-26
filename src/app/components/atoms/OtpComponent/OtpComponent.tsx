import React from "react";
import OtpInput, { OtpInputProps } from "react-otp-input";

interface OtpComponentProps extends OtpInputProps {
  otp: string;
  customClassName?: string;
  customInputStyle?: string;
  customFocusStyle?: string;
}
const OtpComponent = ({ otp, customClassName, customFocusStyle, customInputStyle, ...otherProps }: OtpComponentProps) => {
  return (
    <div className="flex items-center justify-center">
      <OtpInput
        className={`w-[60px] h-[52px] my-4 mr-4 border  flex items-center justify-center rounded-[5px] ${customClassName}`}
        focusStyle={`outline-none ring-0 border-none  ${customFocusStyle}`}
        inputStyle={`!w-full h-full border-citiGray-200 rounded-[5px] outline-none ring-0 border-none ${customInputStyle}`}
        value={otp}
        {...otherProps}
      />
    </div>
  );
};

export default OtpComponent;

OtpComponent.defaultProps = {
  customClassName: "",
  customInputStyle: "",
  customFocusStyle: "",
};
