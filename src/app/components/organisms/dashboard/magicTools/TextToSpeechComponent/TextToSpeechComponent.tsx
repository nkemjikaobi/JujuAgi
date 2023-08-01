"use client";
import CustomBreadCrumb from "@/app/components/atoms/CustomBreadCrumb/CustomBreadCrumb";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import { ButtonProperties } from "@/app/libs/helpers";
import { useRouter } from "next/navigation";
import React from "react";

const TextToSpeechComponent = () => {
  const getBreadCrumbs = () => {
    const breadCrumb = [{ text: "Magic Tools", url: "/dashboard/magic-tools" }, { text: "Text to Speech" }];

    return breadCrumb;
  };

  const router = useRouter();

  return (
    <div>
      <CustomBreadCrumb breadCrumbs={getBreadCrumbs()} />
      <div className="mt-2">
        <PageHeader subTitle="My conversions" title="Text to Speech" />
      </div>
      <div>
        <p>Your Speech list is empty, you can start by converting text.</p>

        <div className="mt-8">
          <CustomButton
            customClass="w-full smallLaptop:!w-[516px]"
            handleClick={() => router.push("/dashboard/magic-tools/text-to-speech/generate-audio")}
            icon="plus"
            loadingText="Generating Audio"
            size={ButtonProperties.SIZES.medium}
            title="Generate Audio"
            type="submit"
            variant={ButtonProperties.VARIANT.primary.name}
          />
        </div>
      </div>
    </div>
  );
};

export default TextToSpeechComponent;
