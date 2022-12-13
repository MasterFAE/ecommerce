import { CATEGORY_TYPE } from "@prisma/client";
import Link from "next/link";
import Router from "next/router";
import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import NavbarSearchItem from "./NavbarSearchItem";
type Props = {
  setModal: any;
};

const MobileAccountDetailsNav = (props: Props) => {
  const [searchText, setSearchText] = useState("");
  const searchAction = (e) => {
    Router.push(`/product/${searchText.toLowerCase()}`);
  };
  const { data: category_data, error: category_error } = useSWR(
    `/api/category/type/${CATEGORY_TYPE.HEADER}`,
    fetcher
  );

  return (
    <div className=" fixed z-40 h-full w-full bg-neutral-900">
      <div className="m-8 flex justify-between text-lg text-neutral-200">
        <>Logo</>
        <button className="rounded-full p-2  focus:border">
          <IoMdClose onClick={() => props.setModal(false)} />
        </button>
      </div>

      <div className="mx-8 flex flex-col gap-y-4 text-neutral-100 focus:underline">
        <div className="group flex w-full flex-row items-center gap-x-2 rounded-lg border bg-neutral-100 p-2 focus:outline">
          <button onClick={searchAction}>
            <ImSearch className="cursor-pointer text-neutral-900" />
          </button>
          <input
            type="text"
            value={searchText}
            onKeyDown={(e) => {
              if (searchText.length > 0 && e.key === "Enter") {
                searchAction();
              }
            }}
            onChange={(e) => setSearchText(e.currentTarget.value)}
            className="bg-red h-full w-full bg-transparent text-neutral-900 outline-none"
            placeholder="Search"
            required
          />
        </div>
        {/* Account */}
        <div className="flex flex-col">
          <div className="flex w-fit flex-row gap-x-2 text-sm font-light text-neutral-400">
            <FaUser></FaUser>Account
          </div>
          <div className="ml-8">
            <Link href={"/account"}>
              <div onClick={() => props.setModal(false)}>Account Details</div>
            </Link>
            <Link href={"/account/cards"}>
              <div onClick={() => props.setModal(false)}>Cards</div>
            </Link>
            <Link href={"/account/orders"}>
              <div onClick={() => props.setModal(false)}>Orders</div>
            </Link>
            <Link href={"/account/reviews"}>
              <div onClick={() => props.setModal(false)}>Reviews</div>
            </Link>
            <Link href={"/account/tickets"}>
              <div onClick={() => props.setModal(false)}>Tickets</div>
            </Link>
          </div>
        </div>
        {/* Category */}
        <div className="flex flex-col">
          <div className="flex w-fit flex-row gap-x-2 text-sm font-light text-neutral-400">
            <FaUser></FaUser>Category
          </div>
          <div className="ml-8">
            {category_data.map((item) => (
              <Link href={`/category/${item.slug}`}>
                <div onClick={() => props.setModal(false)}>{item.name}</div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileAccountDetailsNav;
