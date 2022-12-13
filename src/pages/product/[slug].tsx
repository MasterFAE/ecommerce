import { Category, Product } from "@prisma/client";
import { NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import AddCartButton from "../../components/AddCartButton";
import Layout from "../../components/Layout";
import LikeButton from "../../components/LikeButton";

type Props = {
  data: Product & { primaryCategory: Category };
};

const ProductPage = (props: Props) => {
  const data = props.data;
  if (!data || !data.id)
    return (
      <Layout>
        <div className="flex h-full min-h-[35vh] flex-row items-center justify-center text-center text-xl font-light">
          Item doesn't exist
        </div>
      </Layout>
    );
  return (
    <Layout>
      <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row">
        <Image
          src={data.coverImage || "https://picsum.photos/1920/1080"}
          alt={data.name}
          height={1400}
          width={1400}
          objectFit="cover"
        />
        <div className="flex w-full flex-col justify-between rounded-lg border bg-white p-8">
          <div className="flex h-full flex-col justify-between gap-y-4 divide-y divide-neutral-200">
            {/* Item name, image */}
            <div className="font-semibold text-neutral-700">
              <span className="cursor-pointer text-xl leading-none hover:underline">
                {data.name}
              </span>
              <Link href={`/category/${data.primaryCategory.slug}`}>
                <h4 className="cursor-pointer text-sm font-light leading-tight text-neutral-500 hover:underline">
                  {data.primaryCategory.name}
                </h4>
              </Link>
              <div className="mt-2 border-t pt-2 text-sm font-light text-neutral-700 line-clamp-6">
                <p>
                  {data.description ||
                    "No description provided for this product."}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between px-2 pt-4">
              <div className="flex flex-row items-center gap-x-1">
                <h1 className="price-tag  text-2xl">
                  {data.price.toFixed(2)} ₺
                </h1>
              </div>
              <div className="flex flex-row items-center">
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-neutral-300" />
                <h1 className="ml-2 cursor-pointer text-center text-sm font-medium text-neutral-500 hover:underline">
                  +{data._count.review}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <AddCartButton text="Add to Cart" id={data.id} />
            {/* <LikeButton /> */}
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const { res, query } = context;
  const response = await fetch(
    `http://localhost:3000/api/product/${query.slug}`
  );
  const data = await response.json();
  res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: { data },
  };
}
export default ProductPage;
