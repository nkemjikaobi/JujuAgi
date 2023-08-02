import ListenToAudioComponent from "@/app/components/organisms/dashboard/magicTools/ListenToAudioComponent/ListenToAudioComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Listen To Audio",
};

const ListenToAudioPage = () => {
  return (
    <div className="p-4 h-full overflow-y-scroll smallLaptop:p-6">
      <ListenToAudioComponent />
    </div>
  );
};

export default ListenToAudioPage;
