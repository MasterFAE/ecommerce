import React from "react";
import Layout from "../components/Layout";

type Props = {};

const FOUROFOUR = (props: Props) => {
  return (
    <Layout>
      <div className="flex h-full min-h-[35vh] flex-row items-center justify-center text-center text-xl font-light">
        404: Page doesn't exist
      </div>
    </Layout>
  );
};

export default FOUROFOUR;
