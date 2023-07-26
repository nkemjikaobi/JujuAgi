import ContinueWithGoogleButton from "@/app/components/atoms/ContinueWithGoogleButton/ContinueWithGoogleButton";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import CustomLink from "@/app/components/atoms/CustomLink/CustomLink";
import FormikCustomInput from "@/app/components/atoms/FormikCustomInput/FormikCustomInput";
import useLoginMutation from "@/app/hooks/useLoginMutation";
import { ButtonProperties, errorMessages } from "@/app/libs/helpers";
import { Form, Formik, FormikProps } from "formik";
import React from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup); // extend yup

interface LoginProps {
  setActive: (id: number) => void;
}

const Login: React.FC<LoginProps> = ({ setActive }) => {
  const { login, isLoading } = useLoginMutation();

  const initialState = {
    email: "",
    password: "",
  };

  interface Values {
    email: string;
    password: string;
  }

  const LoginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required(errorMessages.required("Email")),
    password: yup
      .string()
      .required(errorMessages.required("Password"))
      .min(8, errorMessages.minChar(8))
      .minLowercase(1, errorMessages.minLowerCase(1))
      .minUppercase(1, errorMessages.minUpperCase(1))
      .minNumbers(1, errorMessages.minNumber(1))
      .minSymbols(1, errorMessages.minSymbol(1)),
  });

  const signInUser = async (values: Values) => {
    login({ variables: { loginInput: { ...values } } });
  };

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={signInUser} validationSchema={LoginSchema}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="relative">
              <div className="my-6 smallLaptop:hidden">
                <h1 className="text-20 font-bold mb-2">Welcome back</h1>
                <p className="font-medium text-12">Enter your details to login to your account</p>
              </div>
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

              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container=""
                    icon="padlock"
                    iconClass="mr-2"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 mobileBelow:ml-4 border-black text-14 smallLaptop:text-16"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                  />
                </div>
              </div>
              <CustomLink customClass="flex items-center text-juju-purple-500 text-12 smallLaptop:text-14 font-medium" destination="/auth/forgot-password">
                Forgot Password?
              </CustomLink>
            </div>
            <div className="flex flex-col justify-center items-center mt-[2.5rem]">
              <CustomButton
                customClass="w-full rounded-[0.75rem]"
                handleClick={() => {}}
                isDisabled={isLoading}
                isSubmitting={isLoading}
                size={ButtonProperties.SIZES.big}
                title="Login"
                type="submit"
                variant={ButtonProperties.VARIANT.primary.name}
              />
            </div>
            <p className="smallLaptop:hidden text-12 font-medium text-[#6C7275] mb-4 mt-8 uppercase text-center">or</p>
            <div className="smallLaptop:hidden mb-[30px]">
              <ContinueWithGoogleButton />
            </div>
            <div className="smallLaptop:hidden">
              <p className="font-bold text-12 text-juju-black-100 text-center">
                Don&apos;t have an account?{" "}
                <span className="text-juju-purple-500 cursor-pointer" onClick={() => setActive(2)}>
                  Sign Up
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </AnimateContainer.fadeIn>
  );
};

export default Login;
