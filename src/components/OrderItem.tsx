import Link from "next/link";
import React from "react";
import timeFormatter from "../lib/timeFormatter";

type Props = {
  data: any;
};

const OrderItem = (props: Props) => {
  const { product, quantity } = props.data;
  return (
    <div className="flex flex-row gap-x-3 rounded-md border bg-white p-2 transition-colors hover:bg-neutral-100">
      <div className="h-20 w-20 rounded-lg bg-violet-300"></div>
      <div className=" grid w-full grid-cols-8">
        <div className="col-span-5 my-2 flex h-full flex-col items-start justify-start ">
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
          <span className="text-xs">{timeFormatter(props.data.createdAt)}</span>
        </div>
        <div className="col-span-3 mr-1 flex h-full  w-full flex-col items-center justify-center gap-y-2">
          <div className="flex h-fit w-full flex-row items-center justify-end gap-x-2 lg:mr-2 lg:gap-x-4">
            <div className="flex flex-row items-center gap-x-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
