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
      <div className="grid grid-cols-12 gap-y-4">
        <div className="col-span-2">
          <h1 className="text-sm text-neutral-600">First Name</h1>
          <h4 className="text-lg text-neutral-900">Sinan</h4>
        </div>
        <div className="col-span-2">
          <h1 className="text-sm text-neutral-600">Last Name</h1>
          <h4 className="text-lg text-neutral-900">Gürcan</h4>
        </div>
        <div className="col-span-4 row-start-2">
          <h1 className="text-sm text-neutral-600">Email</h1>
          <h4 className="text-lg text-neutral-900">s*********@*****.com</h4>
        </div>

        <span className="col-span-6"></span>
        <div className="col-span-1 h-fit w-fit rounded-md border border-orange-300 p-1 ">
          <h1 className="text-orange-500">2 Orders</h1>
        </div>
        <div className="col-span-1 h-fit w-fit rounded-md border border-orange-300 p-1 ">
          <h1 className="text-orange-500">4 Tickets</h1>
        </div>
      </div>
    </AccountLayout>
  );
};

export default Details;
