import { Category, Product } from "@prisma/client";
import { NextPageContext } from "next";
import Image from "next/image";
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
  if (!data.id) return <></>;
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
              <h4 className="cursor-pointer text-sm font-light leading-tight text-neutral-500 hover:underline">
                {data.primaryCategory.name}
              </h4>
              <div className="pt-4 text-sm font-light text-neutral-700 line-clamp-6">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ea
                  cupiditate ullam veritatis. Tempora repudiandae incidunt
                  laudantium? Eligendi in eaque facere maiores animi debitis,
                  expedita officiis, vel repellendus aliquam quod. Lorem ipsum
                  dolor sit amet consectetur adipisicing elit. Ex ea cupiditate
                  ullam veritatis. Tempora repudiandae incidunt laudantium?
                  Eligendi in eaque facere maiores animi debitis, expedita
                  officiis, vel repellendus aliquam quod. dolor sit amet
                  consectetur adipisicing elit. Ex ea cupiditate ullam
                  veritatis. Tempora repudiandae incidunt laudantium? Eligendi
                  in eaque facere maiores animi debitis, expedita officiis, vel
                  repellendus aliquam quod.
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between px-2 pt-4">
              <div className="flex flex-row items-center gap-x-1 text-2xl font-medium text-neutral-800">
                <h1>{data.price.toFixed(2)}</h1>
                <h4 className="self-end text-base font-semibold">₺</h4>
              </div>
              <div className="flex flex-row items-center">
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-yellow-500" />
                <FaStar size={18} className="text-neutral-300" />
                <h1 className="ml-2 cursor-pointer text-center text-sm font-medium text-neutral-500 hover:underline">
                  +{data.reviews || 0}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-between gap-x-2 p-2">
            <AddCartButton text="Add to Cart" id={data.id} />
            <LikeButton />
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
    props: { data }, // will be passed to the page component as props
  };
}
export default ProductPage;
