import { Category, Order, Product, Review } from "@prisma/client";
import { NextPageContext } from "next";
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";

type Props = {
  data: Category & {
    primaryProduct: Product[] & { order: Order[]; review: Review[] };
    product: Product[] & { order: Order[]; review: Review[] };
  };
};

const CategorySlugPage = (props: Props) => {
  const { data } = props;
  const _products = [...data.primaryProduct, ...data.product];

  const [products, setProducts] = useState([..._products]);

  useEffect(() => {
    setProducts(_products);
  }, [data]);

  const filterItems = (e) => {
    switch (e.target.value) {
      case "LOWTOHIGH":
        setProducts(_products.sort((a, b) => a.price - b.price));
        break;
      case "HIGHTOLOW":
        setProducts(_products.sort((a, b) => b.price - a.price));
        break;
      case "REVIEW":
        setProducts(
          _products.sort((a, b) => a._count.review - b._count.review)
        );
        break;

      case "BESTSELLER":
        setProducts(_products.sort((a, b) => a._count.order - b._count.order));
        break;

      case "MOSTINCART":
        setProducts(
          _products.sort((a, b) => b._count.inCart - a._count.inCart)
        );
        break;
      default:
        break;
    }
  };

  return (
    <Layout>
      <div className="mb-4 flex w-full items-end justify-between rounded-lg border bg-white p-4">
        <div className="flex items-end gap-x-2 ">
          <p className="hidden lg:block">Current Category:</p>
          <h1 className="text-xl font-medium">{data.name}</h1>
          <p className="pb-1 text-xs">({_products.length} items)</p>
        </div>
        <div className="">
          <select
            id="sort"
            onChange={filterItems}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 py-1 text-sm text-neutral-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          >
            <option selected>Sort</option>
            <option value="LOWTOHIGH">Price Low to High</option>
            <option value="HIGHTOLOW">Price High to Low</option>
            <option value="REVIEW">Most Review</option>
            <option value="MOSTINCART">Most In Cart</option>
            <option value="BESTSELLER">Best Seller</option>
          </select>
        </div>
      </div>
      <div className=" grid grid-cols-2 gap-2 lg:grid-cols-4">
        {products.map((item) => (
          <ProductCard
            key={item.slug}
            product={{
              ...item,
              primaryCategory: data,
            }}
          ></ProductCard>
        ))}
      </div>
    </Layout>
  );
};
export async function getServerSideProps(context: NextPageContext) {
  const { res, query } = context;
  const response = await fetch(
    `https://fae-ecommerce.vercel.app/api/category/${query.slug}`
  );
  const data = await response.json();
  return {
    props: { data },
  };
}
export default CategorySlugPage;
