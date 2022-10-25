import React from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Link from "next/link";
type Props = {
  product: any;
};

const ProductCard = (props: Props) => {
  const { product } = props;
  return (
    <div className="flex h-fit flex-col gap-y-2 rounded-lg bg-white p-2 shadow-lg">
      <Image
        src="https://picsum.photos/1920/1080"
        width={900}
        height={600}
        className="h-full w-full rounded-lg object-cover"
      />
      <div className="flex h-full w-full flex-col px-2">
        <div className="flex flex-row justify-between">
          <span>
            <div className="flex gap-x-2 gap-y-1 font-semibold text-neutral-700">
              <Link
                href={`/product/${product.slug}`}
                className="cursor-pointer hover:underline"
              >
                {product.name}
              </Link>
              {/* <div className="self-end rounded-full bg-red-500 p-1 px-2">
                <h4 className="text-center text-[0.6rem] font-semibold text-neutral-50">
                  35% OFF
                </h4>
              </div> */}
            </div>
            <h1 className="cursor-pointer text-xs font-light text-neutral-500 hover:underline">
              {product.categoryName}
            </h1>
            <div className="flex flex-row">
              <FaStar size={18} className="text-yellow-500" />
              <FaStar size={18} className="text-yellow-500" />
              <FaStar size={18} className="text-yellow-500" />
              <FaStar size={18} className="text-yellow-500" />
              <FaStar size={18} className="text-neutral-300" />
              <h1 className="ml-2 cursor-pointer self-center text-sm font-medium text-neutral-500 hover:underline">
                +{product.reviews || 0}
              </h1>
            </div>
          </span>
          {/* <div className="self-center rounded-full bg-red-500 p-1 px-2">
            <h4 className="text-center text-xs font-bold text-neutral-50">
              SPECIAL OFFER
            </h4>
          </div> */}
        </div>
      </div>
      <h1 className="pl-2 text-2xl text-neutral-700">
        {product.price.toFixed(2)}₺
      </h1>
      {/* <button className="w-full rounded-lg bg-green-600 p-2 text-neutral-100 transition-all hover:bg-green-700">
        Add to Cart
      </button> */}
    </div>
  );
};

export default ProductCard;
