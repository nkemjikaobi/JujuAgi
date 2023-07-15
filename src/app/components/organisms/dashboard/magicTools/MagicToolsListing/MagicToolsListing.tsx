"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const MagicToolsListing = () => {
  const router = useRouter();

  const data = [
    {
      id: 1,
      title: "Image Compression",
      route: "/dashboard/magic-tools/image-compression",
      imgUrl: "/images/dashboard/magicTools/magic-tool1.png",
    },
    {
      id: 2,
      title: "Text to Speech",
      route: "#",
      imgUrl: "/images/dashboard/magicTools/magic-tool2.png",
    },
    {
      id: 3,
      title: "Image to PDF",
      route: "/dashboard/magic-tools/image-to-pdf",
      imgUrl: "/images/dashboard/magicTools/magic-tool3.png",
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-5">
      {data.map((tool) => (
        <div className="cursor-pointer" key={tool.id} onClick={() => router.push(tool.route)}>
          <Image alt="" height={170} priority={true} src={tool.imgUrl} width={220} />
          <p className="mt-2 font-medium text-18 text-juju-black-400">{tool.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MagicToolsListing;
