import GenerateAudioComponent from "@/app/components/organisms/dashboard/magicTools/GenerateAudioComponent/GenerateAudioComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Generate Audio",
};

const GenerateAudioPage = () => {
  return (
    <div className="p-4 h-full overflow-y-scroll smallLaptop:p-6">
      <GenerateAudioComponent />
    </div>
  );
};

export default GenerateAudioPage;
