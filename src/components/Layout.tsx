import { AnyAction, AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Router } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCartItems, localGetItems } from "../redux/cart/cartSlice";
import { storeType } from "../redux/store";
import { clearUser, getCurrentUser } from "../redux/user/userSlice";
import MobileNavbar from "./MobileNavbar";
import Navbar from "./Navbar";
import Link from "next/link";

type Props = {
  children: any;
  Header?: any;
};

const Layout = (props: Props) => {
  const session = useSession();
  const dispatch = useDispatch<any>();
  const { user, cart } = useSelector((state: storeType) => state);

  useEffect(() => {
    if (user.loading) return;

    const addSavedItems = async (data) => {
      await fetch(`/api/cart/save`, {
        method: "POST",
        body: data,
      });

      dispatch(getCartItems());
    };

    if (user.loggedIn) {
      let data = localStorage.getItem("cart");
      if (data && data.length > 0) {
        localStorage.removeItem("cart");
        addSavedItems(data);
      } else {
        dispatch(getCartItems());
      }
    } else {
      dispatch(localGetItems());
    }
  }, [user]);

  useEffect(() => {
    if (session.status != "loading" && session.data) {
      dispatch(getCurrentUser());
    }
    if (session.status == "unauthenticated") dispatch(clearUser());
  }, [session]);
  return (
    <div className="relative h-screen">
      {props.Header ? (
        props.Header
      ) : (
        <Head>
          <title>FAE - ECOMMERCE APP</title>
          <meta property="og:site_name" content="FAE ECOMMERCE APP" />
          <meta name="description" content="E-Commerce App" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      )}

      <Navbar />
      <MobileNavbar />
      <main className="min-w-screen bg-white">
        <div className="m-auto min-h-[82.5vh] rounded-md border bg-neutral-50 p-2 shadow-md lg:w-3/4 lg:p-4">
          {props.children}
        </div>
      </main>
      <footer>
        <div className="mt-6 h-full w-full bg-neutral-900 sm:mt-12">
          <div className="m-auto flex h-full w-4/6 flex-row flex-wrap justify-between p-4">
            <div id="-1-1">
              <div className="text-lg text-neutral-200">Business</div>
              <div className="flex flex-col items-start gap-y-1 text-sm text-neutral-500">
                <Link
                  href={"https://www.linkedin.com/in/sinan-gurcan/"}
                  target="_blank"
                  passHref
                >
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-full cursor-pointer hover:underline"
                  >
                    About Us
                  </a>
                </Link>
                <Link
                  href={"https://www.linkedin.com/in/sinan-gurcan/"}
                  target="_blank"
                  passHref
                >
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    className="w-full cursor-pointer hover:underline"
                  >
                    Help
                  </a>
                </Link>
                <div className="w-full cursor-pointer hover:underline">FAQ</div>
              </div>
            </div>
            <div id="-1-2">
              <div className="text-lg text-neutral-200">Categories</div>
              <div className="flex flex-col items-start gap-y-1 text-sm text-neutral-500">
                <Link href={"/category/electronics"}>
                  <div className="w-full cursor-pointer hover:underline">
                    Electronics
                  </div>
                </Link>
                <Link href={"/category/housing"}>
                  <div className="w-full cursor-pointer hover:underline">
                    Housing
                  </div>
                </Link>
                <Link href={"/category/clothing"}>
                  <div className="w-full cursor-pointer hover:underline">
                    Clothing
                  </div>
                </Link>
              </div>
            </div>
            <div id="-1-3">
              <div className="text-lg text-neutral-200">Social Media</div>
              <div className="flex flex-col items-start gap-y-1 text-sm text-neutral-500">
                <div className="w-full cursor-pointer hover:underline">
                  Instagram
                </div>
                <div className="w-full cursor-pointer hover:underline">
                  Twitter
                </div>
                <div className="w-full cursor-pointer hover:underline">
                  Facebook
                </div>
              </div>
            </div>
          </div>
          <div className="w-full bg-black p-2 text-center text-sm text-neutral-300">
            © 2022 fAemeister. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
