"use client";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import FormikCustomInput from "@/app/components/atoms/FormikCustomInput/FormikCustomInput";
import Icon from "@/app/components/atoms/Icons";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { FORGOT_PASSWORD } from "@/app/graphql/auth/mutations";
import { ButtonProperties, LocalStorageKeys, NotificationTypes, Status, errorMessages } from "@/app/libs/helpers";
import { useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";
yupPassword(yup); // extend yup

const ForgotPasswordComponent = () => {
  const [forgotPasswordHanlder, { data, loading, error }] = useMutation(FORGOT_PASSWORD);

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
    await forgotPasswordHanlder({
      variables: {
        email: values.email,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const { status, message, data: result } = data.forgotPassword;
      if (status === Status.SUCCESS) {
        showToast(message, NotificationTypes.SUCCESS);
        localStorage.setItem(LocalStorageKeys.FORGOT_CUSTOMER_EMAIL, result.email?.toLowerCase());
        router.push("/auth/reset-password");
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
                isDisabled={loading}
                isSubmitting={loading}
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
