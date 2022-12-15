import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Router from "next/router";
import React from "react";
import { FaBars } from "react-icons/fa";
import Layout from "./Layout";

type Props = {
  children: any;
};

const AccountLayout = (props: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") return <h1>Account Loading</h1>;
  if (status === "unauthenticated") {
    Router.push("/login");
    return <></>;
  }
  return (
    <Layout>
      <div className="grid min-h-[100vh]  grid-cols-8 gap-x-4">
        <div className="col-span-2 hidden h-full border-r md:flex">
          <div className="flex w-full list-none flex-col gap-y-1 p-4">
            <div className="w-full border-l-neutral-400">
              <h1 className="w-fit cursor-pointer text-lg font-medium text-neutral-800 transition-all">
                Account Management
              </h1>
              <ul className="ml-1 px-0 text-base font-light text-neutral-500">
                <Link href="/account">
                  <li className="cursor-pointer hover:underline">Account</li>
                </Link>
                <Link href="/account/address">
                  <li className="cursor-pointer hover:underline">Addresses</li>
                </Link>
                <Link href="/account/cards">
                  <li className="cursor-pointer hover:underline">Cards</li>
                </Link>
                <Link href="/account/orders">
                  <li className="cursor-pointer hover:underline">Orders</li>
                </Link>
                <Link href="/account/reviews">
                  <li className="cursor-pointer hover:underline">Reviews</li>
                </Link>
                <Link href="/account/tickets">
                  <li className="cursor-pointer hover:underline">Tickets</li>
                </Link>
                <li
                  onClick={() => signOut()}
                  className="cursor-pointer font-normal text-red-600 transition-all hover:text-red-700"
                >
                  Log off
                </li>
                <li className="cursor-pointer font-normal text-red-600 transition-all hover:text-red-700">
                  Delete Account
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-span-8 rounded-md border bg-white sm:col-span-6">
          <div className="p-4 sm:p-8">{props.children}</div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountLayout;
