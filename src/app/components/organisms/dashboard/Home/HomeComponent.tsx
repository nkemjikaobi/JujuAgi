"use client";
import CustomLink from "@/app/components/atoms/CustomLink/CustomLink";
import PageHeader from "@/app/components/atoms/PageHeader/PageHeader";
import { AppState } from "@/app/store/rootReducer";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const HomeComponent = () => {
  const { currentUser } = useSelector((state: AppState) => state.auth);
  const router = useRouter();

  const data = [
    {
      id: 1,
      title: "Compressm Images",
      route: "/dashboard/magic-tools/image-compression",
      imgUrl: "/images/dashboard/home/magic-tools-2.png",
    },
    {
      id: 2,
      title: "Text to Speech",
      route: "/dashboard/magic-tools/text-to-speech",
      imgUrl: "/images/dashboard/home/magic-tools-5.png",
    },
    {
      id: 3,
      title: "Image to PDF",
      route: "/dashboard/magic-tools/image-to-pdf",
      imgUrl: "/images/dashboard/home/magic-tools-1.png",
    },
    {
      id: 4,
      title: "Speech to Text",
      route: "/dashboard/magic-tools/speech-to-text",
      imgUrl: "/images/dashboard/home/magic-tools-5.png",
    },
    {
      id: 5,
      title: "Remove Bg",
      route: "#",
      imgUrl: "/images/dashboard/home/magic-tools-4.png",
    },
    {
      id: 6,
      title: "Chat",
      route: "/dashboard/juju-chat",
      imgUrl: "/images/dashboard/home/magic-tools-3.png",
    },
  ];

  const shortcutData = [
    {
      id: 1,
      imgUrl: "/images/dashboard/home/clock.png",
      linkText: "Search Help Center",
      linkUrl: "#",
      text: "to learn more about how to do things.",
    },
    {
      id: 2,
      imgUrl: "/images/dashboard/home/bulb.png",
      linkText: "Check FAQ",
      linkUrl: "#",
      text: "for short answers to most frequent questions.",
    },
  ];

  return (
    <div>
      <PageHeader
        subTitle="What would you like to do today?"
        subTitleClass="smallLaptop:!font-normal smallLaptop:!text-[17px]"
        title={`Good afternoon ${currentUser?.firstName}`}
        titleClass="!text-white !font-normal smallLaptop:!font-normal"
      />
      <div className="smallLaptop:mt-[70px]">
        <h3 className="text-[18px] mb-2">Tools</h3>
        <div className="grid grid-cols-2 smallLaptop:grid-cols-9 gap-3">
          {data.map((tool) => (
            <div className="px-4 py-[10px] bg-juju-purple-500 hover:bg-purple-800 rounded-[8px] smallLaptop:w-[115px] cursor-pointer" key={tool.id} onClick={() => router.push(tool.route)}>
              <Image alt="" height={29} src={tool.imgUrl} width={28} />
              <p className="font-medium text-sm mt-4">{tool.title}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[45px]">
        <h3 className="text-[18px] mb-2">Demo Video</h3>
        <div className="flex smallLaptop:items-start flex-col smallLaptop:flex-row">
          <div className="hidden smallLaptop:block">
            <ReactPlayer className="react-player" controls={true} url="https://youtu.be/85v_3Rp21yo" />
          </div>
          <div className="smallLaptop:hidden">
            <ReactPlayer className="react-player" controls={true} url="https://youtu.be/85v_3Rp21yo" width={"100%"} />
          </div>
          <Image alt="" height={172} src="/images/juju-drops.png" width={265} />
        </div>
      </div>
      <div className="mt-4 smallLaptop:mt-[45px]">
        <h3 className="text-[18px] mb-2">Shortcuts to helpful stuff</h3>
        <div className="mt-2 grid grid-cols-1 smallLaptop:grid-cols-2 gap-6">
          {shortcutData.map((shortcut) => (
            <div className="bg-juju-black-600 flex items-center h-[86px] px-4 py-2 rounded-[8px] text-white opacity-90" key={shortcut.id}>
              <Image alt="" className="mr-5" height={58} src={shortcut.imgUrl} width={46} />
              <div className="flex items-center">
                <CustomLink customClass="!text-juju-blue-300" destination={shortcut.linkUrl}>
                  {shortcut.linkText}
                </CustomLink>
                <span className="ml-1">{shortcut.text}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
