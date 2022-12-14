import { Product } from "@prisma/client";
import React, { useState } from "react";
import { FaShoppingCart, FaExclamation } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  localAddItem,
  localUpdateItem,
  addItem,
  updateQuantity,
} from "../redux/cart/cartSlice";
import { storeType } from "../redux/store";
import ADDCARTSTATUS from "../types/addCartStatusType";

type Props = {
  product: Product;
};

const AddCartButton = (props: Props) => {
  const { product } = props;

  const [status, setStatus] = useState(ADDCARTSTATUS.DEFAULT);
  const dispatch = useDispatch();
  const {
    cart: { items },
    user,
  } = useSelector((state: storeType) => state);

  const renderStatus = (_status: ADDCARTSTATUS) => {
    switch (_status) {
      case ADDCARTSTATUS.DEFAULT:
        return <FaShoppingCart size={16}></FaShoppingCart>;

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
    if (user.loggedIn) {
      let item = items.findIndex((x) => x.itemId === product.id);
      if (item !== -1) {
        dispatch(
          //@ts-ignore
          updateQuantity({
            itemId: product.id,
            quantity: items[item].quantity + 1,
          })
        );
        statusChanger(ADDCARTSTATUS.SUCCESSFUL);
        return;
      }
      const request = await fetch(`/api/cart/${product.id}`, {
        method: "POST",
      });
      const data = await request.json();

      if (!request.ok) {
        //throw system error
        statusChanger(ADDCARTSTATUS.FAILED);
        return;
      }
      dispatch(addItem(data.item));
      statusChanger(ADDCARTSTATUS.SUCCESSFUL);
    } else {
      let result = items.findIndex((item) => item.item.id === product.id);
      console.log({ result });
      if (result >= 0) {
        dispatch(
          localUpdateItem({
            id: product.id,
            quantity: items[result]?.quantity + 1 || 1,
          })
        );
      } else {
        dispatch(
          localAddItem({
            item: product,
            quantity: 1,
          })
        );
      }

      statusChanger(ADDCARTSTATUS.SUCCESSFUL);
    }
  };
  return (
    <button
      disabled={status === ADDCARTSTATUS.LOADING}
      onClick={addToCart}
      className="rounded-md bg-blue-500 p-2 text-white shadow-md shadow-blue-300 transition-all hover:bg-blue-700 hover:text-neutral-200 focus:ring"
    >
      {renderStatus(status)}
    </button>
  );
};

export default AddCartButton;
