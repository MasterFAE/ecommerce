import React, { useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import Layout from "../components/Layout";
import { CartItemResponse } from "../redux/cart/cartSlice";
import { storeType } from "../redux/store";

type Props = {};

const transportCost = 35;

const Cart = (props: Props) => {
  const { items } = useSelector((state: storeType) => state.cart);

  const [total, setTotal] = useState(0);
  const [deal, setDeal] = useState(0);

  React.useEffect(() => {
    calculateTotal();
  }, [items]);

  const calculateTotal = () => {
    let _total: number = 0,
      _deal: number = 0;
    items.forEach((element) => {
      _total += element.item.price * element.quantity;
      if (element.item.deal) {
        _deal += Math.round(
          element.item.price * element.quantity * (element.item.deal / 100)
        );
      }
    });
    setTotal(_total);
    setDeal(_deal);
  };

  return (
    <Layout>
      <div className="grid gap-x-2 md:grid-cols-12">
        <div className="flex flex-col gap-y-1 rounded-md   p-4 md:col-span-9">
          <h1 className="text-2xl font-semibold text-neutral-800">
            {items.length} Items
          </h1>
          {items.map((e: CartItemResponse) => {
            return <CartItem data={e} />;
          })}
        </div>
        <div className="flex w-full flex-col rounded-sm border bg-neutral-100 p-4 md:col-span-3">
          <div className=" text-2xl font-medium text-neutral-800">Summary</div>
          {items.length > 0 ? (
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
              <button className="mt-2 rounded-lg bg-green-600 p-1 text-lg text-white transition-all hover:bg-green-700 focus:bg-green-700">
                Continue
              </button>
            </>
          ) : (
            <h1 className="text-neutral-500">0 items in your cart</h1>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
