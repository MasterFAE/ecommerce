import type { NextPage } from "next";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
/*
  TODO:
  * Footer
  * Cart Page:  
        - Fetch items in cart
        - Calculate total
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
  console.log({ data });
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <div
        className="
      grid grid-cols-2 gap-x-2 gap-y-4 md:grid-cols-3 xl:grid-cols-4"
      >
        <div className="col-span-full min-h-[450px]">
          <div className="h-full w-full bg-violet-600 bg-opacity-30"></div>
        </div>
        {data.map((e) => (
          <ProductCard product={e} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
