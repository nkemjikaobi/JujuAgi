import CustomButton from "@/app/components/atoms/CustomButton/CustomButton";
import { ButtonProperties } from "@/app/libs/helpers";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ImageCompressionSuccessProps {
  compressedImageUrl: string;
  resetCompression: () => void;
  originalImage: any;
  compressedImage: any;
}

const ImageCompressionSuccess: React.FC<ImageCompressionSuccessProps> = ({ compressedImageUrl, resetCompression, compressedImage, originalImage }) => {
  const [oldSize, setOldSize] = useState<string>("");
  const [newSize, setNewSize] = useState<string>("");
  const [percentDecrease, setPercentDecrease] = useState<string>("");

  const calculateCompressionResult = (originalImage: any, compressedImage: any) => {
    const units = ["bytes", "KB", "MB", "GB"];

    const originalSize = originalImage.size;
    const compressedSize = compressedImage.size;

    let originalSizeValue = originalSize;
    let compressedSizeValue = compressedSize;
    let originalUnitIndex = 0;
    let compressedUnitIndex = 0;

    while (originalSizeValue >= 1024 && originalUnitIndex < units.length - 1) {
      originalSizeValue /= 1024;
      originalUnitIndex++;
    }

    while (compressedSizeValue >= 1024 && compressedUnitIndex < units.length - 1) {
      compressedSizeValue /= 1024;
      compressedUnitIndex++;
    }

    const percentageDecrease = ((originalSize - compressedSize) / originalSize) * 100;
    const formattedPercentageDecrease = percentageDecrease.toFixed(2);

    const originalUnit = units[originalUnitIndex];
    const compressedUnit = units[compressedUnitIndex];

    setOldSize(`${originalSizeValue.toFixed(2)}${originalUnit}`);
    setNewSize(`${compressedSizeValue.toFixed(2)}${compressedUnit}`);
    setPercentDecrease(formattedPercentageDecrease);
  };

  useEffect(() => {
    if (originalImage && compressedImage) {
      calculateCompressionResult(originalImage, compressedImage);
    }
  }, [originalImage, compressedImage]);

  return (
    <div className="mx-auto w-[600px]">
      <h2 className="text-32 font-bold mb-[2.5rem] whitespace-nowrap text-center">Image compressed successfully</h2>
      <div className="w-[604px] h-auto bg-juju-gray-200 rounded-[20px] p-6">
        <div className="relative w-full h-[377px]">
          <Image alt="" fill src={compressedImageUrl} />
          {/* <Image alt="" height={577} src={compressedImageUrl} width={577} /> */}
        </div>
        {/* <Image alt="" height={577} src="/images/dashboard/magicTools/magic-tool1.png" width={577} /> */}
        {oldSize && newSize && percentDecrease && (
          <p className="my-4 text-center">
            Image Compressed by {percentDecrease}% |{" "}
            <span className="font-bold">
              {oldSize} -&gt; {newSize}
            </span>
          </p>
        )}
        <div className="mt-12 flex items-center justify-center">
          <a download={originalImage?.name} href={compressedImageUrl} rel="noopener noreferrer" target="_blank">
            <CustomButton
              customClass="mr-6 text-14 font-medium w-[162px] !bg-black hover:!bg-juju-black-100"
              handleClick={() => {}}
              icon="download"
              iconPosition="end"
              size={ButtonProperties.SIZES.small}
              title="Download Image"
              type="submit"
              variant={ButtonProperties.VARIANT.primary.name}
            />
          </a>
          <CustomButton
            customClass="text-14 font-medium !w-[193px]"
            handleClick={() => resetCompression()}
            icon="plusCircle"
            iconPosition="end"
            size={ButtonProperties.SIZES.small}
            title="Compress New Image"
            type="submit"
            variant={ButtonProperties.VARIANT.primary.name}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCompressionSuccess;
