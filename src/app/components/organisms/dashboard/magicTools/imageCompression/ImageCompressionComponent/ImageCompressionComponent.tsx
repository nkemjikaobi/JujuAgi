"use client";
import CustomBreadCrumb from "@/app/components/atoms/CustomBreadCrumb/CustomBreadCrumb";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import Icon from "@/app/components/atoms/Icons";
import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { ButtonProperties, NotificationTypes } from "@/app/libs/helpers";
import imageCompression from "browser-image-compression";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

import ImageCompressionSuccess from "./ImageCompressionSuccess";

const ImageCompressionComponent = () => {
  const { getRootProps, getInputProps, acceptedFiles, fileRejections } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxFiles: 1,
  });

  const [originalImageUrl, setOriginalImageUrl] = useState<string>("");
  const [compressedImageUrl, setCompressedImageUrl] = useState<string>("");
  const [originalImage, setOriginalImage] = useState<any>();
  const [compressedImage, setCompressedImage] = useState<any>();
  const [, setOriginalFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isCompressed, setIsCompressed] = useState<boolean>(false);

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      toast.dismiss();

      // const files: any = acceptedFiles;

      // const filteredFiles = files.filter((file: any) => {
      //   if (file.size > imageUploadLimit) {
      //     showToast(`${file.name} is greater than 1mb. Please upload images below 1mb.`, NotificationTypes.ERROR);
      //     return false;
      //   }

      //   return true;
      // });

      if (acceptedFiles?.length > 0) {
        setOriginalImage(acceptedFiles[0]);
        setOriginalImageUrl(URL.createObjectURL(acceptedFiles[0]));
        setOriginalFileName(acceptedFiles[0].name);
      }
    }
  }, [acceptedFiles]);

  useEffect(() => {
    if (fileRejections.length > 0) {
      fileRejections.map((rejection: any) => rejection.errors.map((error: any) => showToast(error.message, NotificationTypes.ERROR)));
    }
  }, [fileRejections]);

  const getBreadCrumbs = () => {
    const breadCrumb = [{ text: "Magic Tools", url: "/dashboard/magic-tools" }, { text: "Image Compression" }];

    return breadCrumb;
  };

  const compressImageHandler = () => {
    setLoading(true);
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 800,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= originalImage?.size / 1024) {
      showToast("Bring a bigger image", NotificationTypes.INFO);
      setLoading(false);
      return;
    }

    let output;
    imageCompression(originalImage, options).then((x) => {
      output = x;

      setCompressedImage(output);
      const downloadLink = URL.createObjectURL(output);
      setCompressedImageUrl(downloadLink);
      setLoading(false);
      setIsCompressed(true);
    });
  };

  const resetCompression = () => {
    URL.revokeObjectURL(originalImageUrl);
    URL.revokeObjectURL(compressedImageUrl);
    setOriginalImageUrl("");
    setCompressedImageUrl("");
    setOriginalFileName("");
    setOriginalImage(undefined);
    setCompressedImage(undefined);
    setIsCompressed(false);
  };

  return (
    <div>
      <CustomBreadCrumb breadCrumbs={getBreadCrumbs()} />
      <div className="mt-2">
        <PageHeader subTitle="Add the image you want to compress" title="Image Compression" />
      </div>
      {isCompressed ? (
        <ImageCompressionSuccess compressedImage={compressedImage} compressedImageUrl={compressedImageUrl} originalImage={originalImage} resetCompression={resetCompression} />
      ) : (
        <>
          {originalImageUrl ? (
            <div className="relative w-[516px] h-[464px]">
              <Image alt="" fill src={originalImageUrl} />
              {/* <Image alt="" height={264} src={originalImageUrl} width={516} /> */}
            </div>
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
          <div className="mt-12">
            <CustomButton
              customClass="!w-[516px]"
              handleClick={() => compressImageHandler()}
              icon="plus"
              isDisabled={!originalImageUrl || loading}
              isSubmitting={loading}
              loadingText="Compressing Image"
              size={ButtonProperties.SIZES.big}
              title="Start Compressing"
              type="submit"
              variant={ButtonProperties.VARIANT.primary.name}
            />
            <p
              className="mt-2 text-juju-purple-200 underline cursor-pointer"
              onClick={() => {
                URL.revokeObjectURL(originalImageUrl);
                setOriginalImageUrl("");
                setOriginalFileName("");
                setOriginalImage(undefined);
              }}
            >
              Remove Image
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageCompressionComponent;
