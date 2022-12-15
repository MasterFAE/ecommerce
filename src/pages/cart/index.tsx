import Router from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import Layout from "../../components/Layout";
import calculateTotal from "../../lib/calculateTotal";
import { CartItemResponse, getCartItems } from "../../redux/cart/cartSlice";
import { storeType } from "../../redux/store";

type Props = {};

const transportCost = 35;

const Cart = (props: Props) => {
  const {
    cart: { items },
    user,
  } = useSelector((state: storeType) => state);
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  const [deal, setDeal] = useState(0);

  React.useEffect(() => {
    const { _total, _deal } = calculateTotal(items);
    setTotal(_total);
    setDeal(_deal);
  }, [items]);

  const clearItems = async () => {
    await fetch("/api/cart", { method: "DELETE" });
    dispatch(getCartItems());
  };

  return (
    <Layout>
      <div className="grid gap-x-2 md:grid-cols-12">
        <div className="flex flex-col gap-y-1 rounded-md py-4 sm:p-4 md:col-span-9">
          <div className="flex flex-row items-center justify-between">
            <h1 className="w-full text-2xl font-semibold text-neutral-800">
              {items.length} Items
            </h1>
            {items.length > 0 && (
              <h4
                onClick={clearItems}
                className="cursor-pointer text-sm hover:underline"
              >
                Clear
              </h4>
            )}
          </div>
          {items.length > 0 ? (
            <>
              {items.map((e: CartItemResponse) => {
                return <CartItem data={e} loggedIn={user.loggedIn} />;
              })}
            </>
          ) : (
            <h1 className="text-neutral-500">Add new items into your cart!</h1>
          )}
        </div>
        {items.length > 0 && (
          <div className="flex min-h-[30vh] w-full flex-col rounded-sm border bg-neutral-100 p-4 md:col-span-3 md:min-h-[65vh]">
            <div className=" text-2xl font-medium text-neutral-800">
              Summary
            </div>
            <>
              <div className="mt-1 flex flex-col  gap-y-1 rounded-md border bg-white p-4">
                <div className="flex w-full justify-between text-base">
                  <p className="font-light text-neutral-700">Product Price</p>
                  <p className="font-semibold text-neutral-800">
                    {total.toFixed(2)} ₺
                  </p>
                </div>
                <div className="flex justify-between text-base">
                  <p className="font-light text-neutral-700">Transport Price</p>
                  <p className="font-semibold text-neutral-800">
                    {transportCost.toFixed(2)} ₺
                  </p>
                </div>
                {deal > 0 && (
                  <div className="flex justify-between text-base">
                    <p className="font-light text-violet-700">Discount</p>
                    <p className="font-semibold text-violet-700">
                      -{deal.toFixed(2)} ₺
                    </p>
                  </div>
                )}
                <hr className="mt-2" />
                <div className="mt-2 flex justify-between text-base">
                  <p className="font-light text-neutral-700">Total</p>
                  <p className="font-semibold text-neutral-800">
                    {(total + transportCost - deal).toFixed(2)} ₺
                  </p>
                </div>
              </div>
              {user.loggedIn ? (
                <>
                  {" "}
                  {items.length > 0 && (
                    <button
                      onClick={() => Router.push("cart/checkout")}
                      className="mt-2 rounded-lg bg-green-600 p-1 text-lg text-white transition-all hover:bg-green-700 focus:bg-green-700"
                    >
                      Continue
                    </button>
                  )}
                </>
              ) : (
                <button
                  onClick={() => Router.push("/login")}
                  className="mt-2 rounded-lg bg-green-600 p-1 text-lg text-white transition-all hover:bg-green-700 focus:bg-green-700"
                >
                  Log in
                </button>
              )}
            </>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
