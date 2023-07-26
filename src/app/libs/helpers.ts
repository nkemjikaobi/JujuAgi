import moment, { Moment } from "moment";
import { ParsedUrlQuery } from "querystring";

/* eslint-disable no-unused-vars */
export const ButtonProperties = {
  SIZES: {
    small: "small",
    medium: "medium",
    big: "big",
    full: "full",
  },
  ICON_POSITION: {
    start: "start",
    end: "end",
  },
  VARIANT: {
    primary: {
      name: "primary",
    },
    secondary: {
      name: "secondary",
    },
    custom: {
      name: "custom",
    },
  },
};

export const classNames = (...classes: string[]): string => {
  return classes.filter(Boolean).join(" ");
};

export const errorMessages = {
  email: "Email is not valid",
  maxChar: (num: number) => `This field cannot have more than ${num} characters`,
  minChar: (num: number) => `This field must be at least ${num} characters`,
  minLowerCase: (num: number) => `This field must be at least ${num} lower case character`,
  minUpperCase: (num: number) => `This field must be at least ${num} upper case character`,
  minNumber: (num: number) => `This field must be at least ${num} number`,
  minSymbol: (num: number) => `This field must be at least ${num} special character`,
  required: (fieldName: string) => `${fieldName} is compulsory`,
  passwordMatch: "Passwords dont match",
  positiveInteger: "The number must be greater than 0",
  integer: "No decimals allowed",
};

export const composeClasses = (...styles: Array<any>) => {
  let classes = "";

  styles.forEach((arg) => {
    if (arg) classes += `${arg} `;
  });

  return classes.trim();
};

export const getSanitizedHtml = (content: string) => ({ __html: content });

export const NotificationTypes = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARN: "warn",
};

export const imageUploadLimit = 1000000;

export enum LocalStorageKeys {
  TOKEN = "token",
  EXPIRATION_TIME = "time",
  CUSTOMER_EMAIL = "CustomerEmail",
}

export const getTokenExpirationTime = (): Moment => {
  // moment().add(70, "h"); --- 70 hours from current time
  const timeToExpiration = process.env.NEXT_PUBLIC_TIME_TO_EXPIRATION_IN_MINUTES || 45;
  return moment().add(Number(timeToExpiration), "m");
};

export const getUrlQuery = (query: ParsedUrlQuery): string => {
  if (Object.keys(query).length > 0) {
    return `?${Object.entries(query).map(([key, value]) => `${key}=${value}&`)}`.replaceAll(",", "").slice(0, -1);
  } else return "";
};

export const getLoginPath = (pathname: string, query: ParsedUrlQuery): string => {
  const redirectPath = `${pathname}${getUrlQuery(query).replace("?", "&")}`;

  return `/?rdr=${redirectPath}`;
};

/**
 * Status for various responses
 */
export const Status = {
  FAILED: "failed",
  SUCCESS: "success",
  ERROR: "error",
};
