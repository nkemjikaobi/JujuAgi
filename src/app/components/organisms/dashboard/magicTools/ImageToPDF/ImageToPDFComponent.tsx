"use client";
import CustomBreadCrumb from "@/app/components/atoms/CustomBreadCrumb/CustomBreadCrumb";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import Icon from "@/app/components/atoms/Icons";
import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { ButtonProperties, NotificationTypes } from "@/app/libs/helpers";
import Image from "next/image";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import Pdf from "react-to-pdf";
import { toast } from "react-toastify";

const ImageToPDFComponent = () => {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  const [base64Strings, setBase64Strings] = useState([]);
  const ref: any = useRef();

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      toast.dismiss();

      if (acceptedFiles?.length > 0) {
        getBase64Strings();
      }
    }
    // eslint-disable-next-line
  }, [acceptedFiles]);

  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.map((rejection: any) => rejection.errors.map((error: any) => showToast(error.message, NotificationTypes.ERROR)));
    }
  }, [fileRejections]);

  const getBase64Representation = (file: any) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getBase64Strings = useCallback(async () => {
    const base64Strings: any = await Promise.all(acceptedFiles.map((file) => getBase64Representation(file)));
    setBase64Strings(base64Strings);
  }, [acceptedFiles]);

  const getBreadCrumbs = () => {
    const breadCrumb = [{ text: "Magic Tools", url: "/dashboard/magic-tools" }, { text: "Image To PDF" }];

    return breadCrumb;
  };

  return (
    <div>
      <CustomBreadCrumb breadCrumbs={getBreadCrumbs()} />
      <div className="mt-2">
        <PageHeader subTitle="Add the image you want to convert" title="Image To PDF" />
      </div>
      <>
        <div ref={ref}>
          {base64Strings?.length > 0 ? (
            <>
              {base64Strings.map((base64String) => (
                <div className="relative w-[516px] h-[464px]" key={base64String}>
                  <Image alt="" fill src={base64String} />
                </div>
              ))}
            </>
          ) : (
            <div className="w-[516px] h-[398px] bg-juju-purple-500 rounded-[20px] p-3">
              <div className=" flex justify-center flex-col items-center cursor-pointer w-full h-full" id="upload" {...getRootProps()}>
                <input {...getInputProps()} />
                <div className="flex justify-center mb-[2.125rem]">
                  <Icon className="block text-center" name="upload" />
                </div>
                <div className="flex flex-col justify-center items-center text-white">
                  <p className="text-24 font-medium">Choose image file</p>
                  <p className="text-14 mt-2 font-medium">Or drag and drop here</p>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-12">
          <Pdf filename="image.pdf" options={{ orientation: "landscape" }} scale={0.9} targetRef={ref}>
            {({ toPdf }: any) => (
              <CustomButton
                customClass="!w-[516px]"
                handleClick={toPdf}
                icon="plus"
                isDisabled={base64Strings?.length < 1}
                loadingText="Coverting Image"
                size={ButtonProperties.SIZES.big}
                title="Generate PDF"
                type="submit"
                variant={ButtonProperties.VARIANT.primary.name}
              />
            )}
          </Pdf>
          <p
            className="mt-2 text-juju-purple-200 underline cursor-pointer"
            onClick={() => {
              setBase64Strings([]);
            }}
          >
            Remove Image
          </p>
        </div>
      </>
    </div>
  );
};

export default ImageToPDFComponent;
