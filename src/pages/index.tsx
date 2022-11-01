import type { NextPage } from "next";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import CategoryCard from "../components/CategoryCard";
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
  * Login Page
      - Redirect if session exists
  * Account Details Page
      - Change password
      - Change email
      - See adress info and change them
  * Mobile navbar and adjustments
*/

const Home: NextPage = () => {
  const { data, error } = useSWR("/api/product", fetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <div className="px-2">
        <div className="min-h-[450px] w-full">
          <div className="min-h-[450px] w-full bg-violet-600 bg-opacity-30"></div>
        </div>
        <div className="mt-2">
          <h1 className="w-fit border-b border-neutral-300 pr-2 text-lg font-semibold text-neutral-700">
            Popular Categories
          </h1>

          <div
            className=" mt-2
        grid grid-cols-3 gap-2 pb-2  md:grid-cols-4 xl:grid-cols-5"
          >
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
            <CategoryCard />
          </div>
        </div>
        <div className="mt-2">
          <h1 className="w-fit border-b border-neutral-300 pr-2 text-lg font-semibold text-neutral-700">
            Popular Categories
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
      </div>
    </Layout>
  );
};

export default Home;
