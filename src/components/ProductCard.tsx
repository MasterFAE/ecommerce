import React, { useState } from "react";
import Image from "next/image";
import { MdDone } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
import LikeButton from "./LikeButton";
import { Category, Product } from "@prisma/client";
import AddCartButton from "./AddCartButton";
import ReviewStars from "./ReviewStars";

type Props = {
  product: Product & { primaryCategory: Category };
};

const ProductCard = (props: Props) => {
  const { product } = props;
  return (
    <div className="flex min-h-[250px] flex-col rounded-lg border bg-white py-2  md:min-h-[300px] lg:min-h-[350px]">
      <div className="h-fit w-fit">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={product.coverImage}
            width={"400"}
            height={"500"}
            alt={product.slug}
            quality={100}
            objectFit="cover"
            className="scale-95 cursor-pointer rounded-lg transition-transform hover:scale-90"
          />
        </Link>
      </div>
      <div className="flex h-full w-full flex-col justify-between divide-neutral-300  px-3 sm:pb-1">
        {/* Item main info */}
        <div>
          {/* Item name, image */}
          <div className="w-full font-semibold text-neutral-700">
            <Link className="h-fit w-full" href={`/product/${product.slug}`}>
              <span className="w-full cursor-pointer text-base leading-none hover:underline md:text-xl">
                {product.name}
              </span>
            </Link>
            <div className="flex flex-col gap-y-1 md:mt-1  md:flex-row md:justify-between md:gap-0">
              {/* Item category name */}
              <Link href={`/category/${product.primaryCategory.slug}`}>
                <h4 className="cursor-pointer text-sm font-light leading-tight text-neutral-500 hover:underline">
                  {product.primaryCategory.name}
                </h4>
              </Link>
              <ReviewStars count={product._count.review} />
            </div>

            {/* <div className="self-end rounded-full bg-red-500 p-1 px-2">
                <h4 className="text-center text-[0.6rem] font-semibold text-neutral-50">
                  35% OFF
                </h4>
              </div> */}
          </div>
        </div>
        <div className="mt-2 flex w-full flex-row items-center justify-between  md:flex-row">
          <h1 className="price-tag flex w-full items-center gap-x-1 ">
            {product.price.toFixed(2)} ₺
          </h1>
          <AddCartButton text="Add to Cart" size="sm" id={product.id} />
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
