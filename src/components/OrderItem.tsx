import Link from "next/link";
import React from "react";
import timeFormatter from "../lib/timeFormatter";
import Image from "next/image";
type Props = {
  data: any;
};

const OrderItem = (props: Props) => {
  const { product, quantity } = props.data;
  return (
    <div className="flex flex-row gap-x-3 rounded-md border bg-white p-2 transition-colors hover:bg-neutral-100">
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
      <div className=" grid w-full grid-cols-8">
        <div className="col-span-8 my-2 flex h-full flex-col items-start justify-start ">
          <Link href={"/product/" + product.slug}>
            <h1 className="cursor-pointer self-start text-lg font-light hover:underline">
              {product.name}
            </h1>
          </Link>
          <h1 className="price-tag w-fit">
            {!isNaN((product.price * quantity).toFixed(2))
              ? (product.price * quantity).toFixed(2) + "₺"
              : "0.00₺"}
          </h1>
          <span className="text-xs text-neutral-500">
            {timeFormatter(props.data.createdAt)}
          </span>
        </div>
        {/* <div className="col-span-3 mr-1 flex h-full  w-full flex-col items-center justify-center gap-y-2">
          <div className="flex h-fit w-full flex-row items-center justify-end gap-x-2 lg:mr-2 lg:gap-x-4">
            <div className="flex flex-row items-center gap-x-1"></div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default OrderItem;
