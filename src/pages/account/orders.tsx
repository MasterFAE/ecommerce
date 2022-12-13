import React from "react";
import useSWR from "swr";
import AccountLayout from "../../components/AccountLayout";
import CartItem from "../../components/CartItem";
import Loading from "../../components/Loading";
import OrderItem from "../../components/OrderItem";
import fetcher from "../../lib/fetcher";

type Props = {};

const Orders = (props: Props) => {
  const { data, error } = useSWR(`/api/user/order`, fetcher);
  if (error) return <div></div>;
  return (
    <AccountLayout>
      <div className="col-span-12 row-start-4">
        <h1 className="self-end text-base text-neutral-600">Orders</h1>
        <div className="">
          {!data ? (
            <div className="flex justify-center">
              <Loading></Loading>
            </div>
          ) : (
            <>
              {data && data.length > 0 ? (
                //reviews will render in this condition
                <span className="grid grid-cols-1 gap-2">
                  {data
                    .sort(function (a, b) {
                      return (
                        new Date(b.createdAt).getTime() -
                        new Date(a.createdAt).getTime()
                      );
                    })
                    .map((item) => (
                      <OrderItem data={item}></OrderItem>
                    ))}
                </span>
              ) : (
                <p className="col-span-2 text-center text-sm text-neutral-600">
                  You haven't made any order
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </AccountLayout>
  );
};

export default Orders;
