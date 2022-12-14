import React from "react";
import { FaPlus } from "react-icons/fa";
import AccountLayout from "../../components/AccountLayout";
import AddressItem from "../../components/AddressItem";
import Layout from "../../components/Layout";

type Props = {};

const Address = (props: Props) => {
  return (
    <AccountLayout>
      <div className="col-span-12 row-start-3">
        <div className="mb-2 flex w-full flex-row justify-between">
          <div className="flex flex-row gap-x-2">
            <div className="self-center rounded-lg bg-blue-400 px-2 py-[2px] text-center text-sm font-medium text-blue-900">
              WIP
            </div>
            <h1 className="self-end text-base text-neutral-600">Address</h1>
          </div>
          <button className="flex flex-row items-center gap-x-1 rounded-md bg-green-600 px-2 py-1 text-sm text-white transition-colors hover:bg-green-700">
            <FaPlus />
            Add New
          </button>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <AddressItem></AddressItem>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Address;
