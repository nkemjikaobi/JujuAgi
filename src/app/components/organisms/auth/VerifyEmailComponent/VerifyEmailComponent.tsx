"use client";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import Icon from "@/app/components/atoms/Icons";
import OtpComponent from "@/app/components/atoms/OtpComponent/OtpComponent";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { RESEND_VERIFICATION_EMAIL, VERIFY_ACCOUNT } from "@/app/graphql/auth/mutations";
import { ButtonProperties, LocalStorageKeys, NotificationTypes, Status } from "@/app/libs/helpers";
import { useMutation } from "@apollo/client";
import { Form, Formik, FormikProps } from "formik";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimateContainer } from "react-animate-container";
import * as yup from "yup";
import yupPassword from "yup-password";
yupPassword(yup); // extend yup

const VerifyEmailComponent = () => {
  const [verifyEmailHandler, { data, loading, error }] = useMutation(VERIFY_ACCOUNT);
  const [resendVerificationEmailHandler, { data: resendData, loading: resendLoader, error: resendError }] = useMutation(RESEND_VERIFICATION_EMAIL);
  const [otp, setOtp] = useState<string>("");

  const router = useRouter();
  const initialState = {
    email: "",
  };

  interface Values {
    email: string;
  }

  const verifyEmail = async (values: Values) => {
    if (otp.length < 4) return showToast("OTP is not complete", NotificationTypes.ERROR);

    await verifyEmailHandler({
      variables: {
        email: localStorage.getItem(LocalStorageKeys.CUSTOMER_EMAIL),
        token: otp,
      },
    });
  };

  useEffect(() => {
    if (data) {
      const { status, message } = data.verifyAccount;
      if (status === Status.SUCCESS) {
        showToast(message, NotificationTypes.SUCCESS);
        router.push("/dashboard/home");
        localStorage.removeItem(LocalStorageKeys.CUSTOMER_EMAIL);
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

  useEffect(() => {
    if (resendData) {
      const { status, message } = resendData.resendVerificationEmail;
      if (status === Status.SUCCESS) {
        showToast(message, NotificationTypes.SUCCESS);
      }
      if (status === Status.FAILED || status === Status.ERROR) {
        showToast(message, NotificationTypes.ERROR);
      }
    }

    if (resendError) {
      showToast("An error occurred", NotificationTypes.ERROR);
    }

    // eslint-disable-next-line
  }, [resendData, resendError]);

  const handleChange = async (otp: string) => {
    if (otp) {
      setOtp(otp);
    }
  };

  // useEffect(() => {
  //   if (typeof window !== undefined && !localStorage.getItem(LocalStorageKeys.CUSTOMER_EMAIL)) {
  //     showToast("Unauthorized", NotificationTypes.ERROR);
  //     router.push("/");
  //   }
  //   // eslint-disable-next-line
  // }, [localStorage]);

  return (
    <AnimateContainer.fadeIn>
      <Formik enableReinitialize initialValues={initialState} onSubmit={verifyEmail} validationSchema={null}>
        {(props: FormikProps<Values>) => (
          <Form>
            <div className="flex items-center mb-8">
              <Icon className="mr-4 cursor-pointer" name="arrowLeft" onClick={() => router.push("/")} />
              <h3 className="text-20 smallLaptop:text-24 font-medium text-juju-black-100">Verify Your Email</h3>
            </div>
            <div className="relative">
              <div className="">
                <div className="mb-4">
                  <OtpComponent isInputNum={true} numInputs={4} onChange={handleChange} otp={otp} placeholder="2034" value={otp} />
                </div>
              </div>
            </div>
            <div
              className="flex justify-end items-center text-juju-purple-500 text-12 smallLaptop:text-14 font-medium cursor-pointer hover:text-juju-purple-800"
              onClick={async () => {
                await resendVerificationEmailHandler({
                  variables: {
                    email: localStorage.getItem(LocalStorageKeys.CUSTOMER_EMAIL),
                  },
                });
              }}
            >
              Resend OTP
            </div>
            <div className="flex flex-col justify-center items-center mt-[2.5rem]">
              <CustomButton
                customClass="w-full rounded-[0.75rem]"
                handleClick={() => {}}
                isDisabled={loading || otp.length < 4 || resendLoader}
                isSubmitting={loading || resendLoader}
                size={ButtonProperties.SIZES.big}
                title="Verify Email"
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

export default VerifyEmailComponent;
