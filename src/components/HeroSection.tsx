import React, { useEffect, useState } from "react";
import Image from "next/image";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import img1 from "../../public/img/1.png";
import img2 from "../../public/img/2.png";
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
      img: img1,
      alt: "item1",
      href: "",
      title: "Black Friday up to %75 off!",
    },
    {
      img: img2,
      alt: "item2",
      href: "",
      title: "%60 Off",
    },
  ];

  const [index, setIndex] = useState(0);

  function renderItem(_id) {
    const source = dummyMd[_id];
    return (
      <div className="w-full bg-red-50">
        <Link href={source.href}>
          <Image
            className="cursor-pointer"
            objectFit="cover"
            quality={100}
            src={source.img}
            alt={source?.alt}
            width={1920}
            height={860}
          ></Image>
        </Link>
      </div>
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
    <div className="relative w-[full]">
      {renderItem(index)}
      <div className="relative flex flex-row items-center justify-center gap-x-2">
        {dummyMd.map((e, key) => {
          if (key === index)
            return (
              <span className="h-5 w-5 cursor-pointer rounded-full bg-neutral-500 bg-opacity-[0.85] ring-1 ring-neutral-300"></span>
            );
          return (
            <span
              onClick={() => setIndex(key)}
              className="h-5 w-5 cursor-pointer rounded-full bg-neutral-800 bg-opacity-[0.85] ring-1 ring-neutral-900"
            ></span>
          );
        })}
      </div>
    </div>
  );
};

export default HeroSection;
