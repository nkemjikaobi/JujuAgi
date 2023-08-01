"use client";
import CustomBreadCrumb from "@/app/components/atoms/CustomBreadCrumb/CustomBreadCrumb";
import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import Icon from "@/app/components/atoms/Icons";
import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { ButtonProperties, NotificationTypes } from "@/app/libs/helpers";
import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";

export interface VoiceProp {
  default: boolean;
  lang: string;
  localService: boolean;
  name: string;
  voiceURI: string;
}

const GenerateAudioComponent = () => {
  const getBreadCrumbs = () => {
    const breadCrumb = [
      { text: "Magic Tools", url: "/dashboard/magic-tools" },
      { text: "Text to Speech", url: "/dashboard/magic-tools/text-to-speech" },
      { text: "Generate Audio" },
    ];

    return breadCrumb;
  };

  const onEnd = () => {
    console.log("done");
  };

  const [value, setValue] = useState<string>("");
  const [rate, setRate] = useState<number>(1);
  const [voiceIndex, setVoiceIndex] = useState<any>(0);
  const { speak, voices, cancel, supported, speaking } = useSpeechSynthesis({
    onEnd,
  });

  const handleSpeak = () => {
    if (!supported) showToast("Your browser does not support this feature", NotificationTypes.ERROR);

    speak({ text: value, rate, voice: voices[voiceIndex] });
  };

  return (
    <div>
      <CustomBreadCrumb breadCrumbs={getBreadCrumbs()} />
      <div className="mt-2">
        <PageHeader title="Text to Speech" />
      </div>
      <div>
        <textarea
          className="p-6 focus:border-none focus:outline-none focus:ring-0 maxTablet:w-[85%]"
          cols={74}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your text here"
          rows={10}
        />
        <div className="my-8 flex items-center">
          <h2 className="mb-2 mr-4 text-14 smallLaptop:text-16">Select Voice</h2>
          <div className="relative bg-[#EBE5FC] rounded-[12px] mr-4 maxTablet:w-[60%]">
            <select
              className="p-4 w-full focus:border-none text-14 focus:outline-none focus:ring-0  rounded-[12px] bg-[#EBE5FC] text-juju-purple-500 font-bold appearance-none"
              onChange={(e) => setVoiceIndex(e.target.value)}
              value={voiceIndex}
            >
              <option value="">Default</option>
              {voices.map((option: VoiceProp, index: number) => (
                <option key={option.voiceURI} value={index}>
                  {`${option.lang} - ${option.name}`}
                </option>
              ))}
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Icon name="arrowDownPurple" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center">
          <div className="relative bg-[#EBE5FC] rounded-[12px] mr-4 w-[100px]">
            <select
              className="p-4 focus:border-none text-14 focus:outline-none focus:ring-0  rounded-[12px] bg-[#EBE5FC] text-juju-purple-500 font-bold appearance-none"
              onChange={(e) => setRate(Number(e.target.value))}
              value={rate}
            >
              <option value={0.5}>0.5.X</option>
              <option value={1}>1.X</option>
              <option value={1.5}>1.5.X</option>
              <option value={2}>2.X</option>
            </select>
            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <Icon name="arrowDownPurple" />
            </div>
          </div>
          <CustomButton
            customClass="w-[55%] smallLaptop:!w-[516px]"
            handleClick={() => handleSpeak()}
            icon="plus"
            isDisabled={!value || speaking}
            loadingText="Generating Audio"
            size={ButtonProperties.SIZES.medium}
            title="Generate Audio"
            type="submit"
            variant={ButtonProperties.VARIANT.primary.name}
          />
        </div>
        <div className="w-1/2">
          {true && (
            <p className="text-center my-8 text-16 text-juju-purple-500 underline cursor-pointer" onClick={cancel}>
              Stop Playing
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GenerateAudioComponent;
