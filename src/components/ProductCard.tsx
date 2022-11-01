import React, { useState } from "react";
import Image from "next/image";
import { MdDone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { Category, Product } from "@prisma/client";
import AddCartButton from "./AddCartButton";

type Props = {
  product: Product & { primaryCategory: Category };
};

const ProductCard = (props: Props) => {
  const { product } = props;

  return (
    <div className="flex min-h-[250px] flex-col rounded-lg border bg-white p-2 md:min-h-[300px] lg:min-h-[350px]">
      <div className="h-fit w-fit">
        <Link className="h-fit w-fit " href={`/product/${product.slug}`}>
          <Image
            src="https://picsum.photos/1920/1080"
            width={"1080px"}
            height={"1080px"}
            quality={70}
            className="cursor-pointer rounded-lg object-cover transition-transform hover:scale-95"
          />
        </Link>
      </div>
      <div className="flex h-fit w-full flex-col justify-between divide-neutral-300  px-3">
        {/* Item main info */}
        <div className="">
          {/* Item name, image */}
          <div className="w-full font-semibold text-neutral-700">
            <Link className="h-fit w-full" href={`/product/${product.slug}`}>
              <span className="w-full cursor-pointer text-base leading-none hover:underline md:text-xl">
                {product.name}
              </span>
            </Link>
            <div className="flex flex-col gap-y-1 md:mt-1  md:flex-row md:justify-between md:gap-0">
              {/* Item category name */}
              <h4 className="cursor-pointer text-sm font-light leading-tight text-neutral-500 hover:underline">
                {product.primaryCategory.name}
              </h4>
              {/* Item review star */}
              <div className="flex flex-row items-center">
                <FaStar className="text-base text-yellow-500 md:text-lg" />
                <FaStar className="text-base text-yellow-500 md:text-lg" />
                <FaStar className="text-base text-yellow-500 md:text-lg" />
                <FaStar className="text-base text-yellow-500 md:text-lg" />
                <FaStar className="text-base text-neutral-300 md:text-lg" />
                <h1 className="ml-1 cursor-pointer self-center text-xs font-medium text-neutral-500 hover:underline md:text-sm">
                  +{product.reviews || 0}
                </h1>
              </div>
              <h1 className="flex items-center gap-x-1 text-lg  font-medium text-neutral-800 md:hidden">
                {product.price.toFixed(2)}
                <h4 className="self-end text-base font-semibold">₺</h4>
              </h1>
            </div>

            {/* <div className="self-end rounded-full bg-red-500 p-1 px-2">
                <h4 className="text-center text-[0.6rem] font-semibold text-neutral-50">
                  35% OFF
                </h4>
              </div> */}
          </div>
        </div>
        <div className="mt-1 flex flex-col items-center justify-between md:flex-row">
          <h1 className="hidden items-center gap-x-1 text-xl font-medium text-neutral-800 md:flex">
            {product.price.toFixed(2)}
            <h4 className="self-end text-base font-semibold">₺</h4>
          </h1>
          <div className="flex w-full flex-row items-center justify-between gap-x-8  md:mt-0 md:justify-end md:gap-x-2">
            <AddCartButton id={product.id} />
            <LikeButton size={16} />
          </div>
        </div>
        {/* <div className="self-center rounded-full bg-red-500 p-1 px-2">
            <h4 className="text-center text-xs font-bold text-neutral-50">
              SPECIAL OFFER
            </h4>
          </div> */}
      </div>
    </div>
  );
};

export default ProductCard;
