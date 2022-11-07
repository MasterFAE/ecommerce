import { Product } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  product: Product;
};

const NavbarSearchItem = (props: Props) => {
  const { product } = props;
  return (
    <a className="w-full cursor-pointer odd:bg-neutral-50 even:bg-neutral-100">
      <Link passHref href={`/product/${product.slug}`}>
        <button className="m-0 flex w-full flex-row gap-x-2 p-2">
          <div className="h-16 w-16 rounded-md bg-neutral-700 outline-violet-200 ring-1 ring-white transition-transform hover:scale-95 group-focus:outline"></div>
          <div className="flex flex-col items-center justify-start">
            <h1 className="text-lg font-light text-neutral-800">
              {product.name}
            </h1>
            <h4 className="price-tag w-full text-start">{product.price} ₺</h4>
          </div>
        </button>
      </Link>
    </a>
  );
};

export default NavbarSearchItem;
