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
    <div className="mx-auto smallLaptop:w-[600px]">
      <h2 className="font-medium text-20 smallLaptop:text-32 smallLaptop:font-bold mb-[2.5rem] whitespace-nowrap text-center">Image compressed successfully</h2>
      <div className="smallLaptop:w-[604px] h-auto bg-juju-gray-200 rounded-[20px] smallLaptop:p-6">
        <div className="relative flex items-center justify-center w-full smallLaptop:h-[377px]">
          <div className="hidden smallLaptop:block">
            {/* <Image alt="" height={577} src="/images/dashboard/magicTools/magic-tool1.png" width={577} /> */}
            <Image alt="" fill src={compressedImageUrl} />
          </div>
          <div className="smallLaptop:hidden">
            {/* <Image alt="" height={204} src="/images/dashboard/magicTools/magic-tool1.png" width={303} /> */}
            <Image alt="" height={204} src={compressedImageUrl} width={303} />
          </div>
          {/* <Image alt="" height={577} src={compressedImageUrl} width={577} /> */}
        </div>
        {oldSize && newSize && percentDecrease && (
          <p className="mb-4 mt-8 smallLaptop:mt-16 text-center">
            Image Compressed by {percentDecrease}% |{" "}
            <span className="font-bold">
              {oldSize} -&gt; {newSize}
            </span>
          </p>
        )}
        <div className="mt-12 flex flex-col smallLaptop:flex-row items-center justify-center">
          <a className="w-full smallLaptop:w-[162px] smallLaptop:mr-6" download={originalImage?.name} href={compressedImageUrl} rel="noopener noreferrer" target="_blank">
            <CustomButton
              customClass="mb-6 smallLaptop:mb-0 text-14 font-medium w-full !bg-black hover:!bg-juju-black-100"
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
            customClass="text-14 font-medium w-full smallLaptop:!w-[193px]"
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
