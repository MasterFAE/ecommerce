import { Category, CATEGORY_TYPE } from "@prisma/client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUserAlt } from "react-icons/fa";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import useSWR from "swr";
import fetcher from "../lib/fetcher";
import { storeType } from "../redux/store";
import NavbarSearchItem from "./NavbarSearchItem";
import PriceTag from "./PriceTag";
type Props = {};

const Navbar = (props: Props) => {
  const { user, cart } = useSelector((state: storeType) => state);
  const [searchItems, setSearchItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { data: category_data, error: category_error } = useSWR(
    `/api/category/type/${CATEGORY_TYPE.HEADER}`,
    fetcher
  );

  const searchAction = async () => {
    if (searchText.length <= 1) return;
    const response = await fetch(`/api/product/search/${searchText}`, {
      method: "GET",
    });
    if (!response.ok) return;
    setSearchItems((await response.json()) || []);
  };
  return (
    <div>
      <div className="invisible hidden h-[9.5rem] w-[100%] md:block"></div>
      <header className="fixed top-0 left-0 z-20 hidden w-full border-b border-neutral-200 bg-white md:block">
        <div className="m-auto grid h-full w-screen grid-cols-12  items-center py-6">
          <Link href={"/"}>
            <div className="col-span-2 col-start-3 cursor-pointer ">LOGO</div>
          </Link>
          <div className="group relative col-span-4">
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
            {/* {searchItems.length > 0 && ( */}
            <div className="absolute hidden max-h-[35vh] w-full flex-col divide-y overflow-y-auto rounded-lg border bg-white group-focus-within:flex">
              {searchItems.length > 0 ? (
                searchItems.map((e) => <NavbarSearchItem product={e} />)
              ) : (
                <div className="w-full bg-white p-2 text-lg font-normal text-neutral-800">
                  <h1>What can I find for you?</h1>
                </div>
              )}
            </div>
            {/* )} */}
          </div>

          <div className="col-span-2 col-start-10 m-auto flex h-full w-full flex-row items-center justify-center divide-x divide-neutral-300 rounded-lg  border bg-white">
            <button className="group relative flex h-full w-full items-center rounded-l-lg bg-neutral-100 transition-colors hover:bg-violet-100 focus:bg-violet-100">
              {user.loggedIn ? (
                <>
                  <Link href={"/account"}>
                    <span className="flex w-full items-center justify-center text-center text-lg transition-all group-hover:text-violet-900 group-focus:text-violet-900">
                      <h1 className="hidden lg:block">Account</h1>
                      <FaUserAlt className="block text-neutral-700 lg:hidden" />
                    </span>
                  </Link>
                  <div className="text-md absolute  top-full hidden w-full items-center divide-x rounded-lg rounded-t-none bg-white text-center transition-all  group-focus-within:block group-hover:block group-focus:block group-aria-pressed:block ">
                    <ul>
                      <li className="cursor-pointer  border-b py-2 hover:bg-neutral-50 hover:text-violet-700 focus:text-violet-700">
                        Account
                      </li>
                      <li className="cursor-pointer border-b py-2 hover:bg-neutral-50 hover:text-violet-700 focus:text-violet-700">
                        Orders
                      </li>
                      <li
                        onClick={() => signOut()}
                        className="cursor-pointer rounded-b-lg py-2 hover:bg-neutral-50 hover:text-violet-700 focus:text-violet-700"
                      >
                        Log Out
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <Link href={"/login"}>
                  <div className="w-full cursor-pointer text-center text-lg transition-all group-hover:text-violet-900 ">
                    Login
                  </div>
                </Link>
              )}
            </button>
            <Link href={"/cart"}>
              <div className="flex h-full w-full cursor-pointer flex-row items-center justify-center gap-x-2 self-center rounded-r-lg bg-neutral-100 text-center transition-all duration-75 hover:bg-violet-100 focus:bg-violet-100">
                <h1 className="hidden lg:block">Cart</h1>
                <FaShoppingCart className="block text-neutral-700 lg:hidden" />
                <div className="rounded-full bg-yellow-400 px-2 py-1 text-xs font-bold text-neutral-700 ring-1 ring-yellow-500">
                  {cart.items.length}
                </div>
              </div>
            </Link>
          </div>
        </div>
        <section className="h-12 bg-neutral-800">
          <div className="m-auto flex h-full w-9/12 flex-row items-center justify-between">
            {!category_data ? (
              <></>
            ) : (
              <>
                {category_data.map((e: Category) => (
                  <Link href={`/category/${e.slug}`}>
                    <h1 className="cursor-pointer text-base text-white transition-colors hover:text-neutral-200">
                      {e.name}
                    </h1>
                  </Link>
                ))}
              </>
            )}
          </div>
        </section>
      </header>
    </div>
  );
};

export default Navbar;
