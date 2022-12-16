import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../../components/CartItem";
import Layout from "../../components/Layout";
import calculateTotal from "../../lib/calculateTotal";
import { CartItemResponse } from "../../redux/cart/cartSlice";
import { storeType } from "../../redux/store";
import Image from "next/image";

import masterCardImage from "../../../public/img/mastercard.png";
import Router from "next/router";
import Loading from "../../components/Loading";
import * as Yup from "yup";
import { ErrorMessage, Field, Formik } from "formik";

type Props = {};

const checkOutSchema = {
  province: Yup.string().required("Required field").max(150, "Too long"),
  name: Yup.string().required("Required field").max(200, "Too long"),
  town: Yup.string().required("Required field").max(150, "Too long"),
  postal: Yup.string().required("Required field").max(25, "Too long"),
  address: Yup.string().required("Required field").max(500, "Too long"),
  cardnumber: Yup.string()
    .required("Required field")
    .length(12, "Invalid length"),
  ccname: Yup.string().required("Required field").max(200, "Too long"),
  ["exp-date"]: Yup.string()
    .required("Required field")
    .length(5, "Invalid length"),
  cvc: Yup.string().required("Required field").length(3, "Invalid length"),
};

const CartPhase2 = (props: Props) => {
  const {
    cart: { items, isLoading },
    user,
  } = useSelector((state: storeType) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [total, setTotal] = useState(0);

  const [address, setAddress] = useState({
    province: "",
    name: "",
    town: "",
    postal: "",
    address: "",
  });
  const [card, setCard] = useState({
    cardnumber: "",
    ccname: "",
    "exp-date": "",
    cvc: "",
  });

  useEffect(() => {
    if (!user.loading && !user.loggedIn) Router.push("/cart");
  }, []);

  useEffect(() => {
    if (items.length == 0 && !isLoading) Router.push("/cart");
    const { _total, _deal } = calculateTotal(items);
    setTotal(_total);
  }, [items]);

  const checkLuhn = (num: string) =>
    !(
      num
        .replace(/\D/g, "") //remove non-digits
        .split("") //make an array
        .reverse() //last digit first
        .map((e, i) => e * ((i % 2) + 1)) //double every even element
        .join("") //instead of if(d > 9)
        .split("") // d -=9
        .reduce((e, t) => t - 0 + e, 0) % //sum elements
      10
    );

  const replaceCard = (input: string) => input.replace(/\s/g, "");

  const handleCard = (e) => {
    if (e.target.id == "cardnumber" && replaceCard(e.target.value).length > 16)
      return;

    setCard((state) => ({
      ...state,
      [e.target.id]: e.target.value,
    }));
  };

  const renderCardNo = (cardnumber: string) => {
    let parsedL = replaceCard(cardnumber).length;
    if (cardnumber.length > 0 && parsedL % 4 == 0 && parsedL != 16)
      return cardnumber + " ";
    return cardnumber;
  };

  const proceedPayment = async (data) => {
    setLoading(true);
    // const {
    //   cardnumber,
    //   ccname,
    //   cvc,
    //   address: addressNo,
    //   province,
    //   name,
    //   town,
    //   postal,
    // } = data;
    // let parsedL = replaceCard(cardnumber).length;

    // if (parsedL > 16 || parsedL == 0 || ccname.length == 0 || cvc.length == 0) {
    //   setError("Invalid card length");
    //   setLoading(false);
    //   return;
    // }
    // if (!checkLuhn(card.cardnumber)) {
    //   setError("Invalid credit card number");
    //   setLoading(false);
    //   return;
    // }
    // if (
    //   addressNo.length == 0 ||
    //   province.length == 0 ||
    //   name.length == 0 ||
    //   town.length == 0 ||
    //   postal.length == 0
    // ) {
    //   setError("Invalid address length");
    //   setLoading(false);
    //   return;
    // }

    const _items = items.map((item) => ({
      itemId: item.itemId,
      userId: item.userId,
      quantity: item.quantity,
      price: item.item.price,
    }));

    const response = await fetch(`/api/cart`, {
      method: "POST",
      body: JSON.stringify({ data, items: _items }),
    });
    const result = await response.json();
    if (!response.ok) {
      setError(result.error);
      setLoading(false);
      return;
    }

    Router.push("/account/orders");
  };

  return (
    <Layout>
      <Formik
        validationSchema={checkOutSchema}
        initialValues={{
          province: "",
          name: "",
          town: "",
          postal: "",
          address: "",
          cardnumber: "",
          ccname: "",
          "exp-date": "",
          cvc: "",
        }}
        onSubmit={proceedPayment}
      >
        <div className="flex w-full flex-col gap-y-4 text-neutral-700">
          <div className="mb-0">
            <h1 className="text-2xl font-medium text-neutral-800">Check Out</h1>
          </div>
          {/* Info text */}
          <div className="flex flex-col justify-between gap-2 md:flex-row">
            <div className="mt-0 w-full rounded-md bg-orange-300 p-1 text-center text-sm text-orange-900">
              This is a dummy project, don't enter any valid information about
              yourself.
            </div>
            <div className="mt-0 w-full rounded-md bg-blue-200 p-1 text-center text-sm text-blue-900">
              Order will be created whether the credit card is valid or not.
            </div>
          </div>
          {/* Body */}
          <div className="flex flex-col md:flex-row md:divide-x">
            {/* Address */}
            <div className="w-full md:mr-4">
              <h5 className="mb-2 text-lg font-medium text-neutral-800">
                Delivery Address
              </h5>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="province">Province</label>
                  <Field
                    name="province"
                    id="province"
                    placeholder="Province"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="town">District</label>
                  <ErrorMessage name="town" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    name="town"
                    id="town"
                    placeholder="District"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="name">Delivery Name</label>
                  <ErrorMessage name="name" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    name="name"
                    id="name"
                    placeholder="John Doe"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="postal">Zip Code</label>
                  <ErrorMessage name="postal" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    name="postal"
                    id="postal"
                    placeholder="Zip Code"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-y-1">
                  <label htmlFor="address">Address Details</label>
                  <ErrorMessage name="address" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    as="textarea"
                    name="address"
                    id="address"
                    placeholder="Address"
                    rows={7}
                    maxLength={700}
                    className="col-span-2 max-h-[12.5rem] w-full rounded-lg border p-2 outline-none"
                  />
                </div>
              </div>
            </div>
            {/* Credit Card */}
            <div className="mt-4 w-full md:mt-0 md:pl-4">
              <h5 className="mb-2 text-lg font-medium text-neutral-800">
                Payment Method
              </h5>
              <div className="row-auto grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <div className="grid h-[10rem] w-[20rem] grid-cols-4 grid-rows-6 rounded-xl border bg-gray-900 p-4 text-white">
                    <Image
                      src={masterCardImage}
                      layout="fixed"
                      width={50}
                      height={30}
                    />
                    <div className="col-span-3 row-start-5">
                      {card.cardnumber && renderCardNo(card.cardnumber)}
                    </div>
                    <div className="col-span-3 row-start-6 ">{card.ccname}</div>
                    <div className="col-start-4 row-start-6 ">
                      {card["exp-date"]}
                    </div>
                  </div>
                </div>

                <div className="col-span-2 flex flex-col gap-y-1">
                  <label htmlFor="cardnumber">Card Number</label>
                  <ErrorMessage name="cardnumber" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    id="cardnumber"
                    name="cardnumber"
                    // value={
                    //   card.cardnumber.length > 0
                    //     ? renderCardNo(card.cardnumber)
                    //     : ""
                    // }
                    placeholder="424242424242"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>
                <div className="col-span-2 flex flex-col gap-y-1">
                  <label htmlFor="ccname">Card Owner</label>
                  <ErrorMessage name="ccname" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    id="ccname"
                    name="ccname"
                    placeholder="John Doe"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>

                <div className="flex flex-col gap-y-1">
                  <label htmlFor="exp-date">Expiration Date</label>
                  <ErrorMessage name="exp-date" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    id="exp-date"
                    name="exp-date"
                    placeholder="11/29"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>
                <div className="flex flex-col gap-y-1">
                  <label htmlFor="cvc">CVC</label>
                  <ErrorMessage name="cvc" component="div">
                    {(msg) => (
                      <div className="text-sm font-medium text-red-600">
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                  <Field
                    name="cvc"
                    id="cvc"
                    placeholder="000"
                    className="rounded-lg border p-2 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex  flex-col gap-y-1 rounded-md md:col-span-9">
            <h1 className="text-xl font-semibold text-neutral-800">
              Total: {total.toFixed(2)} ₺ ({items.length} items)
            </h1>
            {items.length > 0 ? (
              <>
                {items.map((e: CartItemResponse) => {
                  return (
                    <CartItem
                      key={e.itemId.toString()}
                      data={e}
                      loggedIn={user.loggedIn}
                    />
                  );
                })}
              </>
            ) : (
              <h1 className="text-neutral-500">
                Add new items into your cart!
              </h1>
            )}
          </div>
          {error.length > 0 && (
            <div className="h-fit w-full rounded-lg border border-red-200 bg-red-300 p-1 px-4 text-sm font-medium text-red-800">
              {error}
            </div>
          )}
          <div className="flex justify-center">
            <button
              // disabled={loading}
              type="submit"
              className="mt-2 flex w-[40rem] justify-center rounded-lg bg-green-600 p-1 text-lg text-white transition-all hover:bg-green-700 focus:bg-green-700"
            >
              {loading ? <Loading color="fill-green-900" /> : "Place the Order"}
            </button>
          </div>
        </div>
      </Formik>
    </Layout>
  );
};

export default CartPhase2;
