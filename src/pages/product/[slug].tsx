import { NextPageContext } from "next";
import Image from "next/image";
import React from "react";
import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Layout from "../../components/Layout";
import product from "../api/product";

type Props = {
  data: any;
};

const ProductPage = (props: Props) => {
  const data = props.data;
  return (
    <Layout>
      <div className="flex flex-col gap-x-10 gap-y-4 pr-4 lg:flex-row">
        <Image
          src={data.coverImage}
          alt={data.name}
          height={1400}
          width={1400}
          objectFit="cover"
        />
        <div className="flex w-full flex-col justify-between pt-4">
          <div className="flex flex-col gap-y-4 divide-y divide-neutral-200">
            <div>
              <h1 className="text-2xl text-neutral-800">{data.name}</h1>
              <h1 className="text-sm text-neutral-600">{data.categoryName}</h1>
            </div>
            <div className="flex flex-row justify-between px-2 pt-4">
              <h1 className="text-2xl text-neutral-800">
                {data.price.toFixed(2)}₺
              </h1>
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
            <div className="pt-4 font-light text-neutral-700">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ea
                cupiditate ullam veritatis. Tempora repudiandae incidunt
                laudantium? Eligendi in eaque facere maiores animi debitis,
                expedita officiis, vel repellendus aliquam quod.
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex ea
                cupiditate ullam veritatis. Tempora repudiandae incidunt
                laudantium? Eligendi in eaque facere maiores animi debitis,
                expedita officiis, vel repellendus aliquam quod.
              </p>
            </div>
          </div>
          <div className="flex flex-row gap-x-2">
            <button className="w-full rounded-xl bg-green-600 bg-opacity-90 py-2 px-4 text-lg text-white transition-all hover:bg-green-700">
              Add to Cart
            </button>
            <button className="rounded-xl bg-red-600 bg-opacity-90 py-2 px-4 text-lg text-white transition-all hover:bg-red-700">
              <FaRegHeart size={24} />
              {/* <FaHeart size={24} /> */}
            </button>
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
    props: { data: data[0] }, // will be passed to the page component as props
  };
}
export default ProductPage;
