import type { NextPage } from "next";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import CategoryCard from "../components/CategoryCard";
import HeroSection from "../components/HeroSection";
import Link from "next/link";
import Loading from "../components/Loading";
/*
  TODO:
  * Footer:
    X initial design
    - Links
  * Cart Page:  
        X Fetch items in cart
        X Calculate total
        - Page 2
        - Address info?
        - Cart info?
        - Payment
  * Orders Page
      - Fetch orders and list
      - Cancel if type == WAITING
      - Review if type == DELIVERED
  * Register Page

  * Account Details Page
      - Change password
      - Change email
      - See adress info and change them

  * Category Page
  * Mobile navbar and adjustments
*/

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/product", fetcher);
  const { data: category_data, error: category_error } = useSWR(
    "/api/category",
    fetcher
  );

  if (error || category_error)
    return (
      <Layout>
        <div className="mt-[20vh] flex h-full w-full items-center justify-center gap-x-2">
          <span className="text-xl">Error!</span>
        </div>
      </Layout>
    );
  if (!data || !category_data)
    return (
      <Layout>
        <div className="mt-[20vh] flex h-full w-full items-center justify-center gap-x-2">
          <Loading color="fill-orange-600"></Loading>
          <span className="text-xl">Loading...</span>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="min-h-[450px] w-full">
        <HeroSection />
      </div>
      <div className="my-2 flex flex-col justify-between gap-x-4 gap-y-2 sm:flex-row">
        <div className="w-full rounded-md bg-blue-300 p-1 px-4 text-center text-sm font-medium text-blue-900">
          I am actively working on this project and will continue to update and
          improve it.
        </div>
        <div className="w-full rounded-md bg-orange-200 p-1 px-4 text-center text-sm font-medium text-orange-900">
          If you have any questions or comments, please don't hesitate to
          contact me.{" "}
          <Link
            href={"https://www.linkedin.com/in/sinan-gurcan/"}
            target="_blank"
            passHref
          >
            <a
              rel="noopener noreferrer"
              target="_blank"
              className="cursor-pointer font-bold"
            >
              LINKEDIN
            </a>
          </Link>
        </div>
      </div>
      <div className="mt-2">
        <h1 className="w-fit border-b border-neutral-300 pr-2 text-lg font-semibold text-neutral-700">
          Popular Categories
        </h1>

        <div
          className=" mt-2
        grid grid-cols-3 gap-2 pb-2  md:grid-cols-4 xl:grid-cols-5"
        >
          {category_data.map((e) => (
            <CategoryCard category={e} />
          ))}
        </div>
      </div>
      <div className="mt-2">
        <h1 className="w-fit border-b border-neutral-300 pr-2 text-lg font-semibold text-neutral-700">
          Featured Products
        </h1>

        <div
          className="
            mt-2
        grid grid-cols-2 gap-x-2 gap-y-4 pb-2  md:grid-cols-3 xl:grid-cols-4"
        >
          {data.map((e) => (
            <ProductCard product={e} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
