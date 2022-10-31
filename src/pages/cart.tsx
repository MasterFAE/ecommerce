import React from "react";
import useSWR from "swr";
import Layout from "../components/Layout";
import fetcher from "../lib/fetcher";

type Props = {};

const Cart = (props: Props) => {
  let { data, error } = useSWR("/api/cart", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  if (data.message === "Not authenticated.") {
  }

  return (
    <Layout>
      <div className="grid grid-cols-5 gap-x-2">
        <div className="col-span-3 flex flex-col bg-white p-2">
          <h1 className="text-2xl font-semibold text-neutral-600">3 Items</h1>
          <div className="flex flex-row gap-x-2">
            <div className="h-24 w-24 rounded-lg bg-violet-300"></div>
            <div className="text-lg font-medium">Item Name</div>
          </div>
        </div>
        <div className="col-span-2 flex w-full flex-col bg-neutral-100">
          <div className=""></div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
