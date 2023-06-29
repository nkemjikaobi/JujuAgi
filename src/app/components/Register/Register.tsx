import { ButtonProperties, errorMessages } from "@/app/libs/helpers";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import * as yup from "yup";
import yupPassword from "yup-password";
import FormikCustomInput from "@/app/components/atoms/FormikCustomInput/FormikCustomInput";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import { AnimateContainer } from "react-animate-container";
import CustomLink from "@/app/components/atoms/CustomLink/CustomLink";

yupPassword(yup); // extend yup

const Register = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  interface Values {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }

  const RegisterSchema = yup.object().shape({
    firstName: yup.string().min(2, "Too Short!").max(50, "Too Long!").required(errorMessages.required("First Name")),
    lastName: yup.string().min(2, "Too Short!").max(50, "Too Long!").required(errorMessages.required("Last Name")),
    email: yup.string().email("Invalid email").required(errorMessages.required("Email")),
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

  const createUserAccount = async (values: Values) => {};

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={createUserAccount} validationSchema={RegisterSchema}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="relative">
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container="!bg-juju-gray-200"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black !bg-juju-gray-200"
                    name="firstName"
                    placeholder="Enter Your First Name"
                    type="text"
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container="!bg-juju-gray-200"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black !bg-juju-gray-200"
                    name="lastName"
                    placeholder="Enter Your Last Name"
                    type="text"
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container="!bg-juju-gray-200"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black !bg-juju-gray-200"
                    name="email"
                    placeholder="Enter Your Email Address"
                    type="email"
                    icon="mail"
                  />
                </div>
              </div>

              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container="!bg-juju-gray-200"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 mobileBelow:ml-4 border-black !bg-juju-gray-200"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                    icon="padlock"
                  />
                </div>
              </div>
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container="!bg-juju-gray-200"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 mobileBelow:ml-4 border-black !bg-juju-gray-200"
                    name="confirmPassword"
                    placeholder="Retype Password"
                    type="password"
                    icon="padlock"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[2.5rem]">
              <CustomButton
                customClass="w-full rounded-[0.75rem]"
                handleClick={() => {}}
                size={ButtonProperties.SIZES.big}
                title="Create Account"
                type="submit"
                variant={ButtonProperties.VARIANT.primary.name}
              />
              <p className="text-juju-gray-100 w-[26.688rem] font-medium text-12 mt-6 text-center">
                By creating an account, you agree to our{" "}
                <CustomLink destination="#" customClass="text-juju-black-200">
                  Terms of Service
                </CustomLink>{" "}
                and{" "}
                <CustomLink destination="#" customClass="text-juju-black-200">
                  Privacy & Cookie Statement
                </CustomLink>
                .
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </AnimateContainer.fadeIn>
  );
};

export default Register;
