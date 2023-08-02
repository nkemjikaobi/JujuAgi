import SpeechToTextComponent from "@/app/components/organisms/dashboard/magicTools/SpeechToTextComponent/SpeechToTextComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Speech To Text",
};

const SpeechToTextPage = () => {
  return (
    <div className="p-4 h-full overflow-y-scroll smallLaptop:p-6">
      <SpeechToTextComponent />
    </div>
  );
};

export default SpeechToTextPage;
