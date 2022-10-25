import type { NextPage } from "next";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
const Home: NextPage = () => {
  const { data, error } = useSWR("/api/product", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Layout>
      <div
        className="
      grid grid-cols-2 gap-x-2 gap-y-4 lg:grid-cols-3"
      >
        <div className="col-span-full min-h-[24rem]">
          <div className="h-full w-full bg-red-600"></div>
        </div>
        {data.map((e) => (
          <ProductCard product={e} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
