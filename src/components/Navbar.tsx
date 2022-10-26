import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import { storeType } from "../redux/store";
type Props = {};

const Navbar = (props: Props) => {
  const user = useSelector((state: storeType) => state.user);
  const [searchText, setSearchText] = useState("");
  const searchAction = () => {
    //api
    console.log("emflkewnfklew");
  };
  return (
    <div>
      <div className="invisible hidden h-24 w-[100%] md:block"></div>
      <header className="fixed top-0 left-0 z-20 hidden w-full border-b border-neutral-200 bg-violet-400 md:block">
        <div className="m-auto grid h-full w-screen grid-cols-12  items-center bg-violet-400  py-6">
          <div className="col-span-2 col-start-3 ">LOGO</div>
          <div className="col-span-4">
            <div className="flex w-full flex-row items-center gap-x-2 rounded-lg bg-white p-2 text-neutral-800 focus:outline">
              <ImSearch
                onClick={searchAction}
                className="cursor-pointer text-violet-900"
              />
              <input
                type="text"
                value={searchText}
                onKeyDown={(e) => {
                  if (searchText.length > 0 && e.key === "Enter") {
                    searchAction();
                  }
                }}
                onChange={(e) => setSearchText(e.currentTarget.value)}
                className="bg-red w-full bg-transparent text-neutral-700 outline-none"
                placeholder="Search"
                required
              />
            </div>
          </div>

          <div className="col-span-2 col-start-10 m-auto flex h-full w-full flex-row items-center justify-center divide-x divide-neutral-400  rounded-lg bg-white">
            <div className="group relative flex h-full w-full items-center rounded-l-lg bg-violet-100">
              {user.loggedIn ? (
                <>
                  <span className="w-full  text-center text-lg transition-all group-hover:text-violet-900">
                    Account
                  </span>
                  <div className="text-md absolute  top-full hidden w-full items-center divide-x rounded-lg rounded-t-none bg-white text-center transition-all  group-focus-within:block group-hover:block group-focus:block ">
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
            </div>

            <div className="flex h-full w-full cursor-pointer items-center justify-center self-center rounded-r-lg bg-violet-100 text-center transition-all duration-75 hover:bg-violet-200 focus:bg-violet-200">
              <h1 className="">Cart</h1>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
