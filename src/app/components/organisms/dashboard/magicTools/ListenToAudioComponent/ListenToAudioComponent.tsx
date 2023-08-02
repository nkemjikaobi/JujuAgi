"use client";
import CustomBreadCrumb from "@/app/components/atoms/CustomBreadCrumb/CustomBreadCrumb";
import Icon from "@/app/components/atoms/Icons";
import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import { showToast } from "@/app/components/atoms/ShowToast/showToast";
import { NotificationTypes } from "@/app/libs/helpers";
import React, { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-kit";

export interface VoiceProp {
  default: boolean;
  lang: string;
  localService: boolean;
  name: string;
  voiceURI: string;
}

const ListenToAudioComponent = () => {
  const getBreadCrumbs = () => {
    const breadCrumb = [
      { text: "Magic Tools", url: "/dashboard/magic-tools" },
      { text: "Speech to Text", url: "/dashboard/magic-tools/speech-to-text" },
      { text: "Listen to Audio" },
    ];

    return breadCrumb;
  };

  const [value, setValue] = useState<string>("");
  const [previousValue, setPreviousValue] = useState<string>("");
  const [blocked, setBlocked] = useState<boolean>(false);
  const [lang] = useState("en-AU");

  const onEnd = () => {
    console.log("done");
    // const newValue = value + previousValue;
    // setValue(newValue);
    // setPreviousValue("");
  };

  const onError = (event: any) => {
    if (event.error === "not-allowed") {
      setBlocked(true);
    }
  };

  const onResult = (result: any) => {
    // const newValue = previousValue + result;
    // setValue(newValue);

    // console.log({ value, result });
    const newPartialResult = previousValue + result;
    setPreviousValue(newPartialResult);

    // // Update the "value" state directly with the partial result
    // const newValue = value + result;
    // setValue(newValue);

    setValue(result);
  };

  // useEffect(() => {
  //   if (value) setPreviousValue(value);
  // }, [value]);

  // const onResult = useCallback(
  //   (result: any) => {
  //     console.log({ value, result });
  //     const newValue = previousValue + result;
  //     setValue(newValue);
  //   },
  //   [value]
  // );

  const { listen, listening, stop, supported } = useSpeechRecognition({
    onResult,
    onEnd,
    onError,
  });

  const toggle = () => {
    if (!supported) return showToast("Your browser does not support this feature", NotificationTypes.ERROR);

    if (listening) return stop();

    setBlocked(false);
    setValue("");
    listen({ lang });
    // listen({ lang, interimResults: false });
  };

  useEffect(() => {
    if (blocked) showToast(" The microphone is blocked for this site in your browser.", NotificationTypes.ERROR);
  }, [blocked]);

  return (
    <div>
      <CustomBreadCrumb breadCrumbs={getBreadCrumbs()} />
      <div className="mt-2">
        <PageHeader subTitle="Record Speech" title="Speech to Text" />
      </div>
      <div className="w-[50%] h-[270px] flex items-center justify-center bg-gray-100 my-8 rounded-[16px] flex-col cursor-pointer maxTablet:w-[85%]" onClick={toggle}>
        <Icon className={listening ? "animate-ping" : ""} name="speaking" />
        <p className="text-24 my-4">{listening ? "Listening...Click to stop" : "Click and start saying something"}</p>
      </div>
      <div>
        <textarea
          className="p-6 focus:border-none focus:outline-none focus:ring-0 maxTablet:w-[85%] w-[50%]"
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your text here"
          rows={10}
          value={value}
        />
      </div>
    </div>
  );
};

export default ListenToAudioComponent;
