import { Category, Product } from "@prisma/client";
import { NextPageContext } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa";
import AddCartButton from "../../components/AddCartButton";
import Layout from "../../components/Layout";
import LikeButton from "../../components/LikeButton";
import ReviewStars from "../../components/ReviewStars";

type Props = {
  data: Product & { primaryCategory: Category };
};

const ProductPage = (props: Props) => {
  const data = props.data;

  if (!data || !data.id)
    return (
      <Layout>
        <div className="flex  min-h-[35vh] flex-row items-center justify-center text-center text-xl font-light">
          Item doesn't exist
        </div>
      </Layout>
    );
  return (
    <Layout>
      <div className="flex h-full flex-col gap-x-10 gap-y-4 lg:flex-row">
        <Image
          src={data.coverImage || "https://picsum.photos/1080/1080"}
          alt={data.name}
          height={1280}
          width={1080}
          objectFit="cover"
        />
        <div className="flex w-full flex-col justify-between rounded-lg border bg-white p-8">
          <div className="flex h-full flex-col justify-between gap-y-4 divide-y divide-neutral-200 ">
            {/* Item name, image */}
            <div className="h-full">
              <div className="flex flex-row justify-between pb-1">
                <div>
                  <span className="cursor-pointer text-xl font-semibold leading-none text-neutral-700 hover:underline">
                    {data.name}
                  </span>
                  <Link href={`/category/${data.primaryCategory.slug}`}>
                    <h4 className="cursor-pointer text-sm font-light leading-tight text-neutral-500 hover:underline">
                      {data.primaryCategory.name}
                    </h4>
                  </Link>
                </div>
                <ReviewStars count={data._count.review}></ReviewStars>
              </div>

              <div className="flex h-full flex-col justify-between border-t pt-2">
                <div className="text-sm font-light text-neutral-700">
                  {data.description ||
                    "No description provided for this product."}
                </div>
              </div>
            </div>
            <div className="mt-8 flex flex-row justify-between pt-6">
              <div className="flex flex-row items-center gap-x-1">
                <h1 className="price-tag  text-2xl">
                  {data.price.toFixed(2)} ₺
                </h1>
              </div>
              <div className="flex flex-row justify-between gap-x-4">
                <AddCartButton text="Add to Cart" id={data.id} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const { res, query } = context;
  res?.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  const response = await fetch(
    `https://fae-ecommerce.vercel.app/api/product/${query.slug}`
  );
  const data = await response.json();

  return {
    props: { data },
  };
}
export default ProductPage;
