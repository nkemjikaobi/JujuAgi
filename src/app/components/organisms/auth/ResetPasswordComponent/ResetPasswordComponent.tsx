"use client";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import FormikCustomInput from "@/app/components/atoms/FormikCustomInput/FormikCustomInput";
import Icon from "@/app/components/atoms/Icons";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { RESET_PASSWORD } from "@/app/graphql/auth/mutations";
import { ButtonProperties, NotificationTypes, Status, errorMessages } from "@/app/libs/helpers";
import { useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";
yupPassword(yup); // extend yup

const ResetPasswordComponent = () => {
  const router = useRouter();
  const [resetPasswordHandler, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const searchParams = useSearchParams();

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
    const token = searchParams.get("token");

    await resetPasswordHandler({
      variables: {
        email: "",
        newPassword: values.password,
        token,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const { status, message } = data.resetPassword;
      if (status === Status.SUCCESS) {
        showToast(message, NotificationTypes.SUCCESS);
        router.push("/auth/password-reset-success");
      }
      if (status === Status.FAILED || status === Status.ERROR) {
        showToast(message, NotificationTypes.ERROR);
      }
    }

    if (error) {
      showToast("An error occurred", NotificationTypes.ERROR);
    }
    // eslint-disable-next-line
  }, [data, error]);

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={resetPassword} validationSchema={ResetPasswordComponentSchema}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="flex items-center mb-8">
              <Icon className="mr-4 cursor-pointer" name="arrowLeft" onClick={() => router.push("/auth/forgot-password")} />
              <h3 className="text-20 smallLaptop:text-24 font-medium text-juju-black-100">Input New Password</h3>
            </div>
            <div className="relative">
              <div className="">
                <div className="mb-4">
                  <FormikCustomInput
                    className="border rounded-[0.75rem]"
                    container=""
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black text-14 smallLaptop:text-16"
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
                    container=""
                    inputClassName="placeholder:text-14 placeholder:text-juju-gray-100 placeholder:pl-3 border-black text-14 smallLaptop:text-16"
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
                isDisabled={loading}
                isSubmitting={loading}
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
