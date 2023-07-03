"use client";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import FormikCustomInput from "@/app/components/atoms/FormikCustomInput/FormikCustomInput";
import Icon from "@/app/components/atoms/Icons";
import { ButtonProperties, errorMessages } from "@/app/libs/helpers";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";
yupPassword(yup); // extend yup

const ResetPasswordComponent = () => {
  const router = useRouter();
  const initialState = {
    password: "",
    confirmPassword: "",
  };

  interface Values {
    password: string;
    confirmPassword: string;
  }

  const ResetPasswordComponentSchema = yup.object().shape({
    password: yup
      .string()
      .required(errorMessages.required("Password"))
      .min(8, errorMessages.minChar(8))
      .minLowercase(1, errorMessages.minLowerCase(1))
      .minUppercase(1, errorMessages.minUpperCase(1))
      .minNumbers(1, errorMessages.minNumber(1))
      .minSymbols(1, errorMessages.minSymbol(1)),
    confirmPassword: yup
      .string()
      .required(errorMessages.required("Password confirmation"))
      .oneOf([yup.ref("password"), ""], errorMessages.passwordMatch),
  });

  const resetPassword = async (values: Values) => {
    router.push("/auth/password-reset-success");
  };

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={resetPassword} validationSchema={ResetPasswordComponentSchema}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="flex items-center mb-8">
              <Icon className="mr-4 cursor-pointer" name="arrowLeft" onClick={() => router.push("/auth/forgot-password")} />
              <h3 className="text-24 font-medium text-juju-black-100">Inout New Password</h3>
            </div>
            <div className="relative">
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container="!bg-juju-gray-200"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black !bg-juju-gray-200"
                    name="password"
                    placeholder="Enter Your New Password"
                    type="password"
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container="!bg-juju-gray-200"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black !bg-juju-gray-200"
                    name="confirmPassword"
                    placeholder="Confirm Your New Password"
                    type="password"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[2.5rem]">
              <CustomButton
                customClass="w-full rounded-[0.75rem]"
                handleClick={() => {}}
                size={ButtonProperties.SIZES.big}
                title="Reset Password"
                type="submit"
                variant={ButtonProperties.VARIANT.primary.name}
              />
            </div>
          </Form>
        )}
      </Formik>
    </AnimateContainer.fadeIn>
  );
};

export default ResetPasswordComponent;
