import { ButtonProperties } from "@/app/libs/helpers";
import React, { Fragment, LegacyRef } from "react";
import { ImSpinner2 } from "react-icons/im";

import Icon from "../Icons";

interface ButtonProps {
  handleClick: Function;
  customBtnClass?: string;
  customClass?: string;
  type?: "button" | "submit" | "reset" | undefined;
  isDisabled?: boolean;
  title?: string;
  isSubmitting?: boolean;
  value?: string;
  icon?: string;
  iconClass?: string;
  id?: string;
  ref?: LegacyRef<HTMLButtonElement> | undefined;
  size?: string;
  iconPosition?: string;
  variant?: string;
  loadingText?: string;
}

const renderContent = (title: string | undefined, isSubmitting: boolean | undefined, loadingText: string) => (
  <Fragment>
    {isSubmitting ? (
      <div className="flex items-center">
        <ImSpinner2 className="animate-spin text-juju-purple-500 text-20 mr-2" />
        {loadingText && <p>{loadingText}</p>}
      </div>
    ) : (
      <Fragment>{title}</Fragment>
    )}
  </Fragment>
);

const CustomButton = ({
  handleClick,
  variant = ButtonProperties.VARIANT.primary.name,
  iconPosition = ButtonProperties.ICON_POSITION.start,
  size = ButtonProperties.SIZES.small,
  ref = null,
  id = "",
  isDisabled = false,
  customClass = "",
  type = "button",
  title = "",
  isSubmitting = false,
  value = "",
  icon = "",
  iconClass = "",
  customBtnClass = "",
  loadingText = "",
}: ButtonProps) => {
  /**
   * This displays the rendered content
   */
  const content = (
    <div className="flex items-center justify-center">
      {!isSubmitting && icon && iconPosition === ButtonProperties.ICON_POSITION.start ? <Icon className={`mr-2 ${iconClass ? iconClass : ""}`} name={icon} /> : ""}
      {renderContent(title, isSubmitting, loadingText)}
      {!isSubmitting && icon && iconPosition === ButtonProperties.ICON_POSITION.end ? <Icon className={`ml-2 ${iconClass ? iconClass : ""}`} name={icon} /> : ""}
    </div>
  );

  const styleMap: { [key: string]: string } = {
    primary: `text-white ${isDisabled ? "bg-juju-gray-800" : "bg-juju-purple-500 hover:bg-juju-purple-800 "}`,
    secondary: "",
    custom: `${customBtnClass}`,
  };

  return isSubmitting || isDisabled ? (
    <button
      className={`cursor-not-allowed whitespace-nowrap py-[16px] rounded-[8px] flex justify-center items-center h-[53px] ${
        size === ButtonProperties.SIZES.small
          ? "tablet:w-[168px] px-[16px]"
          : size === ButtonProperties.SIZES.medium
          ? "tablet:w-[343px] px-[78px]"
          : size === ButtonProperties.SIZES.big
          ? "tablet:w-[427px] px-[120px]"
          : size === ButtonProperties.SIZES.full
          ? "flex w-[100%]"
          : ""
      } ${styleMap[variant]}  ${customClass}`}
      id={id}
      ref={ref}
      type={type}
      value={value}
    >
      {content}
    </button>
  ) : (
    <button
      className={` whitespace-nowrap py-[16px] rounded-[8px] flex justify-center items-center h-[53px] cursor-pointer ${
        size === ButtonProperties.SIZES.small
          ? "tablet:w-[168px] px-[16px]"
          : size === ButtonProperties.SIZES.medium
          ? "tablet:w-[343px] px-[78px]"
          : size === ButtonProperties.SIZES.big
          ? "tablet:w-[427px] px-[120px]"
          : size === ButtonProperties.SIZES.full
          ? "flex w-[100%]"
          : ""
      } ${styleMap[variant]} ${customClass}`}
      id={id}
      onClick={() => handleClick()}
      ref={ref}
      type={type}
      value={value}
    >
      {content}
    </button>
  );
};

export default CustomButton;
