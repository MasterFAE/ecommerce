import React, { useEffect, useState } from "react";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";

type Props = {};

const ImageComponent = ({ source, alt }) => {
  return <Image src={source} alt={alt}></Image>;
};

const components = {
  img: ImageComponent,
};

const HeroSection = (props: Props) => {
  const dummyMd = [
    {
      img: "https://picsum.photos/1920/1080",
      alt: "",
      href: "",
      title: "Black Friday up to %75 off!",
    },
    {
      img: "https://images.hepsiburada.net/banners/s/0/672-378/bannerImage2186_20221124175405.jpeg/format:webp",
      alt: "",
      href: "",
      title: "%60 Off",
    },
    {
      img: "https://images.hepsiburada.net/banners/s/0/672-378/bannerImage2101_20221124162808.jpeg/format:webp",
      alt: "",
      href: "",
      title: "%30 Off",
    },
  ];

  const [index, setIndex] = useState(0);

  function renderItem(_id) {
    const source = dummyMd[_id];
    return (
      <Link href={source.href}>
        <Image
          className="cursor-pointer"
          objectFit="cover"
          quality={100}
          src={source.img}
          layout="fill"
        ></Image>
      </Link>
    );
  }
  useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = 0;
      setIndex((prevIndex) => {
        nextIndex = prevIndex === dummyMd.length - 1 ? 0 : prevIndex + 1;
        renderItem(nextIndex);
        return nextIndex;
      });
    }, 5000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative h-[540px] w-[full]">
      {renderItem(index)}
      <div className="relative top-[95%] flex flex-row items-center justify-center gap-x-2">
        {dummyMd.map((e, key) => {
          if (key === index)
            return (
              <span className="h-5 w-5 cursor-pointer rounded-full bg-gray-600 bg-opacity-[0.85] ring-1 ring-gray-700"></span>
            );
          return (
            <span
              onClick={() => setIndex(key)}
              className="h-5 w-5 cursor-pointer rounded-full bg-gray-800 bg-opacity-[0.85] ring-1 ring-gray-900"
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
