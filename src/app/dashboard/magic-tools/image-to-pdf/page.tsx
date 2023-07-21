import ImageToPDFComponent from "@/app/components/organisms/dashboard/magicTools/ImageToPDF/ImageToPDFComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Image To PDF",
};

const ImageToPDFPage = () => {
  return (
    <div className="p-4 h-full overflow-y-scroll smallLaptop:p-6">
      <ImageToPDFComponent />
    </div>
  );
};

export default ImageToPDFPage;
