import { signOut } from "next-auth/react";
import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import AccountLayout from "../../components/AccountLayout";
import AddressItem from "../../components/AddressItem";
import CreditCardItem from "../../components/CreditCardItem";
import Layout from "../../components/Layout";
import { storeType } from "../../redux/store";

type Props = {};

const Details = (props: Props) => {
  const user = useSelector((state: storeType) => state.user);
  return (
    <AccountLayout>
      <div className="flex flex-row items-start gap-x-8">
        <div className="flex w-24 flex-col gap-y-4">
          <div className="h-24 w-24 rounded-full bg-red-500 ring ring-neutral-200"></div>
          <button className="rounded-lg border border-orange-400  py-1 text-sm text-orange-400 transition-colors duration-200 hover:bg-orange-400 hover:text-white focus:bg-orange-400 focus:text-white">
            Upload
          </button>
          <button className="rounded-lg bg-blue-500 py-1 text-white hover:bg-blue-600 focus:bg-blue-600">
            Edit
          </button>
          <button
            onClick={() => signOut()}
            className="rounded-lg bg-red-500 py-1 text-white hover:bg-red-600 focus:bg-red-600"
          >
            Log out
          </button>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          <div className="col-span-1">
            <h1 className="text-sm text-neutral-600">First Name</h1>
            <h4 className="text-lg text-neutral-900">{user.firstName}</h4>
          </div>
          <div className="col-span-1 col-start-2">
            <h1 className="text-sm text-neutral-600">Last Name</h1>
            <h4 className="text-lg text-neutral-900">{user.lastName}</h4>
          </div>
          <div className="col-span-2 row-start-2">
            <h1 className="text-sm text-neutral-600">Email</h1>
            <h4 className="truncate text-lg text-neutral-900">{user.email}</h4>
          </div>
          <div className="col-span-2 row-start-3">
            <h1 className="text-sm text-neutral-600">Phone Number</h1>
            <h4 className="text-lg text-neutral-900">{user.phoneNumber}</h4>
          </div>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Details;
