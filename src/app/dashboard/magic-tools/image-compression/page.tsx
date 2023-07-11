import ImageCompressionComponent from "@/app/components/organisms/dashboard/magicTools/imageCompression/ImageCompressionComponent/ImageCompressionComponent";
import React from "react";

export const metadata = {
  title: "JujuAGI - Image Compression",
};

const ImageCompressionPage = () => {
  return (
    <div className="p-6">
      <ImageCompressionComponent />
    </div>
  );
};

export default ImageCompressionPage;
