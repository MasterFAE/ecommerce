import { AnyAction, AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";
import Head from "next/head";
import { Router } from "next/router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCartItems } from "../redux/cart/cartSlice";
import { clearUser, getCurrentUser } from "../redux/user/userSlice";
import Navbar from "./Navbar";

type Props = {
  children: any;
};

const Layout = (props: Props) => {
  const session = useSession();
  const dispatch = useDispatch<any>();
  useEffect(() => {
    if (session.status != "loading" && session.data) {
      dispatch(getCurrentUser());
      dispatch(getCartItems());
    }
    if (session.status == "unauthenticated") dispatch(clearUser());
  }, [session]);
  return (
    <div className="relative h-screen">
      <Head>
        <title>FAE E-COMMERCE</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="min-w-screen  min-h-screen bg-white">
        <div className="m-auto min-h-[70vh] rounded-md border bg-neutral-50  px-2 shadow-md lg:w-3/4 lg:p-4 ">
          {props.children}
        </div>
      </main>
      <footer>
        <div className="mt-4 h-full w-full bg-neutral-900">
          <div className="m-auto flex h-full w-4/6 flex-row flex-wrap justify-between p-4">
            <div id="-1-1">
              <div className="text-lg text-neutral-200">Business</div>
              <div className="flex flex-col items-start gap-y-1 text-sm text-neutral-500">
                <div className="w-full cursor-pointer hover:underline">
                  About Us
                </div>
                <div className="w-full cursor-pointer hover:underline">
                  Help
                </div>
                <div className="w-full cursor-pointer hover:underline">FAQ</div>
              </div>
            </div>
            <div id="-1-2">
              <div className="text-lg text-neutral-200">Categories</div>
              <div className="flex flex-col items-start gap-y-1 text-sm text-neutral-500">
                <div className="w-full cursor-pointer hover:underline">
                  Electronics
                </div>
                <div className="w-full cursor-pointer hover:underline">
                  Housing
                </div>
                <div className="w-full cursor-pointer hover:underline">
                  Clothing
                </div>
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
