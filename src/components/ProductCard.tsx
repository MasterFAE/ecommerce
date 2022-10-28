import React, { useState } from "react";
import Image from "next/image";
import { MdDone } from "react-icons/md";
import {
  FaStar,
} from "react-icons/fa";
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
    <div className="flex flex-col gap-y-2 rounded-lg bg-white   p-2 pb-4 shadow-lg md:min-h-[400px] lg:min-h-[450px]">
      <div className="h-fit pb-1">
        <Image
          src="https://picsum.photos/1920/1080"
          width={"1080px"}
          height={"1080px"}
          quality={70}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
      <div className="flex h-full w-full flex-col justify-between gap-y-1 divide-y divide-neutral-300 px-3">
        {/* Item main info */}
        <div>
          {/* Item name, image */}
          <div className="font-semibold text-neutral-700">
            <Link className="h-fit w-fit" href={`/product/${product.slug}`}>
              <span className="cursor-pointer text-xl leading-none hover:underline">
                {product.name}
              </span>
            </Link>
            {/* <div className="self-end rounded-full bg-red-500 p-1 px-2">
                <h4 className="text-center text-[0.6rem] font-semibold text-neutral-50">
                  35% OFF
                </h4>
              </div> */}
          </div>
          {/* Item category name */}
          <h4 className="cursor-pointer text-sm font-light leading-tight text-neutral-500 hover:underline">
            {product.primaryCategory.name}
          </h4>
          {/* Item review star */}
          <div className="mt-1 flex flex-row">
            <FaStar size={18} className="text-yellow-500" />
            <FaStar size={18} className="text-yellow-500" />
            <FaStar size={18} className="text-yellow-500" />
            <FaStar size={18} className="text-yellow-500" />
            <FaStar size={18} className="text-neutral-300" />
            <h1 className="ml-2 cursor-pointer self-center text-sm font-medium text-neutral-500 hover:underline">
              +{product.reviews || 0}
            </h1>
          </div>
          <p className=" mt-2 w-full overflow-hidden text-ellipsis text-sm text-neutral-700 line-clamp-3">
            {product.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium unde sint beatae impedit. Eligendi commodi consequatur perspiciatis quia, qui error velit animi a tempore neque? Incidunt eveniet esse nesciunt quisquam!"}
          </p>
        </div>
        <div className="flex flex-col items-center justify-between pt-2 md:flex-row">
          <h1 className="flex  items-center  gap-x-1 text-xl font-medium text-neutral-800">
            {product.price.toFixed(2)}
            <h4 className="self-end text-base font-semibold">₺</h4>
          </h1>
          <div className="mt-2 flex flex-row items-center justify-center  gap-x-8 md:mt-0 md:gap-x-2">
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
