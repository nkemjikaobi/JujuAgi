import ContinueWithGoogleButton from "@/app/components/atoms/ContinueWithGoogleButton/ContinueWithGoogleButton";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import FormikCustomInput from "@/app/components/atoms/FormikCustomInput/FormikCustomInput";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { REGISTER_USER } from "@/app/graphql/auth/mutations";
import { ButtonProperties, NotificationTypes, Status, errorMessages } from "@/app/libs/helpers";
import { useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import React, { useEffect } from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";

yupPassword(yup); // extend yup

interface RegisterProps {
  setActive: (id: number) => void;
}

const Register: React.FC<RegisterProps> = ({ setActive }) => {
  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER);

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

  const createUserAccount = async (values: Values) => {
    await registerUser({
      variables: {
        registerInput: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
        },
      },
    });
  };

  useEffect(() => {
    if (data) {
      const { status, message } = data.registerUser;
      if (status === Status.SUCCESS) {
        showToast(message, NotificationTypes.SUCCESS);
        // redirect here
      }
      if (status === Status.FAILED || status === Status.ERROR) {
        showToast(message, NotificationTypes.ERROR);
      }
    }

    if (error) {
      showToast("An error occurred", NotificationTypes.ERROR);
    }
  }, [data, error]);

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={createUserAccount} validationSchema={RegisterSchema}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="relative">
              <div className="my-6 smallLaptop:hidden">
                <h1 className="text-20 font-bold mb-2">Welcome back</h1>
                <p className="font-medium text-12">Enter your details to create an account</p>
              </div>
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container=""
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black text-14 smallLaptop:text-16"
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
                    container=""
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black text-14 smallLaptop:text-16"
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
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container=""
                    icon="padlock"
                    iconClass="mr-2"
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 mobileBelow:ml-4 border-black text-14 smallLaptop:text-16"
                    name="confirmPassword"
                    placeholder="Retype Password"
                    type="password"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center items-center mt-[2.5rem]">
              <CustomButton
                customClass="w-full rounded-[0.75rem]"
                handleClick={() => {}}
                isDisabled={loading}
                isSubmitting={loading}
                size={ButtonProperties.SIZES.big}
                title="Create Account"
                type="submit"
                variant={ButtonProperties.VARIANT.primary.name}
              />
              {/* <p className="text-juju-gray-100 w-[26.688rem] font-medium text-12 mt-6 text-center">
                By creating an account, you agree to our{" "}
                <CustomLink customClass="text-juju-black-200" destination="#">
                  Terms of Service
                </CustomLink>{" "}
                and{" "}
                <CustomLink customClass="text-juju-black-200" destination="#">
                  Privacy & Cookie Statement
                </CustomLink>
                .
              </p> */}
            </div>
            <p className="smallLaptop:hidden text-12 font-medium text-[#6C7275] mb-4 mt-8 uppercase text-center">or</p>
            <div className="smallLaptop:hidden mb-[30px]">
              <ContinueWithGoogleButton />
            </div>
            <div className="smallLaptop:hidden">
              <p className="font-bold text-14 text-juju-black-100 text-center">
                Already have an account?{" "}
                <span className="text-juju-purple-500 cursor-pointer" onClick={() => setActive(1)}>
                  Sign In
                </span>
              </p>
            </div>
          </Form>
        )}
      </Formik>
    </AnimateContainer.fadeIn>
  );
};

export default Register;
