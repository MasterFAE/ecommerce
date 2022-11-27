import { Product } from "@prisma/client";
import React, { useState } from "react";
import { FaShoppingCart, FaExclamation } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import product from "../pages/api/product";
import {
  addItem,
  updateItemQuantity,
  updateQuantity,
} from "../redux/cart/cartSlice";
import { storeType } from "../redux/store";
import ADD_CART_OPERATION from "../types/addCartOperation";
import ADDCARTSTATUS from "../types/addCartStatusType";

type Props = {
  id: number;
  quantity?: number | 1;
  text?: string;
  size?: string;
};

const AddCartButton = (props: Props) => {
  const [status, setStatus] = useState(ADDCARTSTATUS.DEFAULT);
  const dispatch = useDispatch();
  const items = useSelector((state: storeType) => state.cart.items);

  const renderStatus = (_status: ADDCARTSTATUS) => {
    switch (_status) {
      case ADDCARTSTATUS.DEFAULT:
        if (props.text) {
          if (props.size === "sm") {
            return (
              <div className="flex flex-row items-center justify-center gap-x-1 px-1 font-medium">
                <FaShoppingCart size={14}></FaShoppingCart>
                <h6 className="text-xs">{props.text && props.text}</h6>
              </div>
            );
          } else {
            return (
              <div className="flex flex-row items-center justify-center gap-x-2 px-2 font-medium">
                <FaShoppingCart size={16}></FaShoppingCart>
                <h6 className="text-sm">{props.text && props.text}</h6>
              </div>
            );
          }
        } else {
          return <FaShoppingCart size={16}></FaShoppingCart>;
        }

      case ADDCARTSTATUS.LOADING:
        return (
          <div role="status">
            <svg
              aria-hidden="true"
              className="h-[16px] w-[16px] animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        );

      case ADDCARTSTATUS.SUCCESSFUL:
        return <MdDone className="motion-safe:animate-pulse" size={16} />;

      case ADDCARTSTATUS.FAILED:
        return (
          <FaExclamation className="motion-safe:animate-pulse" size={16} />
        );
    }
  };

  const statusChanger = async (payload: ADDCARTSTATUS) => {
    setStatus(payload);
    if (payload != ADDCARTSTATUS.LOADING) {
      setTimeout(() => {
        setStatus(ADDCARTSTATUS.DEFAULT);
      }, 2500);
    }
  };

  const addToCart = async (e) => {
    statusChanger(ADDCARTSTATUS.LOADING);
    e.preventDefault();
    let item = items.findIndex((x) => x.itemId === props.id);
    if (item !== -1) {
      dispatch(
        updateQuantity({
          itemId: props.id,
          quantity: items[item].quantity + 1,
        })
      );
      statusChanger(ADDCARTSTATUS.SUCCESSFUL);
      return;
    }
    const request = await fetch(`/api/cart/${props.id}`, { method: "POST" });
    const data = await request.json();

    if (!request.ok) {
      //throw system error
      statusChanger(ADDCARTSTATUS.FAILED);
      return;
    }
    dispatch(addItem(data.item));
    statusChanger(ADDCARTSTATUS.SUCCESSFUL);
  };
  return (
    <button
      disabled={status === ADDCARTSTATUS.LOADING}
      onClick={addToCart}
      className="rounded-full  bg-blue-500 p-2 text-white transition-all hover:bg-blue-700 hover:text-neutral-200 focus:ring"
    >
      {renderStatus(status)}
    </button>
  );
};

export default AddCartButton;
