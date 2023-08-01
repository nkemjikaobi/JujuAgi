import TextToSpeechComponent from "@/app/components/organisms/dashboard/magicTools/TextToSpeechComponent/TextToSpeechComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Text To Speech",
};

const TextToSpeechPage = () => {
  return (
    <div className="p-4 h-full overflow-y-scroll smallLaptop:p-6">
      <TextToSpeechComponent />
    </div>
  );
};

export default TextToSpeechPage;
