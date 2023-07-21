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

const ForgotPasswordComponent = () => {
  const router = useRouter();
  const initialState = {
    email: "",
  };

  interface Values {
    email: string;
  }

  const ForgotPasswordSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required(errorMessages.required("Email")),
  });

  const forgotPassword = async (values: Values) => {
    router.push("/auth/reset-password");
  };

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={forgotPassword} validationSchema={ForgotPasswordSchema}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="flex items-center mb-8">
              <Icon className="mr-4 cursor-pointer" name="arrowLeft" onClick={() => router.push("/")} />
              <h3 className="text-20 smallLaptop:text-24 font-medium text-juju-black-100">Reset your password</h3>
            </div>
            <div className="relative">
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container=""
                    icon="mail"
                    iconClass="mr-2"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black text-14 smallLaptop:text-16"
                    name="email"
                    placeholder="Enter Your Email Address"
                    type="email"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[2.5rem]">
              <CustomButton
                customClass="w-full rounded-[0.75rem]"
                handleClick={() => {}}
                size={ButtonProperties.SIZES.big}
                title="Send Link"
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

export default ForgotPasswordComponent;
