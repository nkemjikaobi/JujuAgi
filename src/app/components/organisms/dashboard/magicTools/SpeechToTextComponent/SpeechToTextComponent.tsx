"use client";
import CustomBreadCrumb from "@/app/components/atoms/CustomBreadCrumb/CustomBreadCrumb";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import { ButtonProperties } from "@/app/libs/helpers";
import { useRouter } from "next/navigation";
import React from "react";

const SpeechToTextComponent = () => {
  const getBreadCrumbs = () => {
    const breadCrumb = [{ text: "Magic Tools", url: "/dashboard/magic-tools" }, { text: "Speech To Text" }];

    return breadCrumb;
  };

  const router = useRouter();

  return (
    <div>
      <CustomBreadCrumb breadCrumbs={getBreadCrumbs()} />
      <div className="mt-2">
        <PageHeader subTitle="Convert Speech" title="Speech to Text" />
      </div>
      <p>Your Speech list is empty, you can start by converting text.</p>

      <div className="mt-8">
        <div>
          <CustomButton
            customClass="w-full smallLaptop:!w-[516px]"
            handleClick={() => router.push("/dashboard/magic-tools/speech-to-text/listen-to-audio")}
            icon="microphone"
            size={ButtonProperties.SIZES.medium}
            title="Record Speech"
            type="submit"
            variant={ButtonProperties.VARIANT.primary.name}
          />
        </div>
      </div>
    </div>
  );
};

export default SpeechToTextComponent;
