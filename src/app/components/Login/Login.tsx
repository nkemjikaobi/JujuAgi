import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import CustomLink from "@/app/components/atoms/CustomLink/CustomLink";
import FormikCustomInput from "@/app/components/atoms/FormikCustomInput/FormikCustomInput";
import { ButtonProperties, errorMessages } from "@/app/libs/helpers";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import React from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup); // extend yup

const Login = () => {
  const router = useRouter();

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
    router.push("/dashboard/explore");
  };

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={signInUser} validationSchema={LoginSchema}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="relative">
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container=""
                    icon="mail"
                    iconClass="mr-2"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black"
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
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 mobileBelow:ml-4 border-black"
                    name="password"
                    placeholder="Enter Password"
                    type="password"
                  />
                </div>
              </div>
              <CustomLink customClass="flex items-center text-juju-purple-500 text-14 font-medium" destination="/auth/forgot-password">
                Forgot Password?
              </CustomLink>
            </div>
            <div className="flex flex-col justify-center items-center mt-[2.5rem]">
              <CustomButton
                customClass="w-full rounded-[0.75rem]"
                handleClick={() => {}}
                size={ButtonProperties.SIZES.big}
                title="Login"
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

export default Login;
