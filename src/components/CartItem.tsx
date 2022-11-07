import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { MdDone } from "react-icons/md";
import { useDispatch } from "react-redux";
import fetcher from "../lib/fetcher";
import {
  CartItemResponse,
  deleteItem,
  updateQuantity,
} from "../redux/cart/cartSlice";

type Props = {
  data: CartItemResponse;
};

const CartItem = (props: Props) => {
  const { data } = props;
  const [quantity, setQuantity] = useState(0);
  const [quantityButton, setQuantityButton] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setQuantity(data.quantity);
  }, [data.quantity]);

  const onChangeQuantity = (e) => {
    let value = parseInt(e.target.value);
    if (value < 0) return;
    else if (value === 0) {
      _deleteItem();
      return;
    }
    setQuantity(value);
    if (e.target.value == data.quantity) {
      setQuantityButton(false);
      return;
    }
    setQuantityButton(true);
  };

  const changeQuantity = async () => {
    if (!quantity) {
      //Throw error quantity cannot be empty
      alert("Quantity can not be empty.");
      return;
    }

    dispatch(updateQuantity({ itemId: data.itemId, quantity }));
    setQuantityButton(false);
  };

  const _deleteItem = async () => {
    const _alert = confirm("Do you want to delete this item?");
    if (_alert) {
      dispatch(deleteItem(data.itemId));
      setQuantityButton(false);
    }
  };

  const continueToPayment = async () => {
    if (quantityButton) {
      alert("Please confirm latest changes.");
      return;
    }
  };

  return (
    <div className="flex flex-row gap-x-3 rounded-md border bg-white p-2 transition-colors hover:bg-neutral-100">
      <div className="h-20 w-20 rounded-lg bg-violet-300"></div>
      <div className=" grid w-full grid-cols-8">
        <div className="col-span-5 flex h-full flex-col items-start justify-start ">
          <h1 className="self-start text-lg font-semibold">{data.item.name}</h1>
        </div>
        <div className="col-span-3 mr-1 flex h-full  w-full flex-col items-center justify-center gap-y-2">
          <div className="flex h-fit w-full flex-row items-center justify-end gap-x-4">
            <h1 className="price-tag w-fit">
              {!isNaN((data.item.price * quantity).toFixed(2))
                ? (data.item.price * quantity).toFixed(2) + "₺"
                : "0.00₺"}
            </h1>
            <input
              id="quantity"
              type={"number"}
              value={quantity}
              onChange={onChangeQuantity}
              className="block h-fit w-10 rounded-md border bg-neutral-200 p-1 text-center text-lg outline-neutral-200"
            />

            <button
              onClick={_deleteItem}
              className="h-fit rounded-lg bg-red-500 p-3 text-white hover:bg-red-600 focus:bg-red-600"
            >
              <FaTrash size={14} />
            </button>
          </div>
          {quantityButton && (
            <button
              onClick={changeQuantity}
              className="flex w-full flex-row justify-center rounded-lg bg-blue-500 p-1 text-sm text-white transition-all hover:bg-blue-600 focus:bg-blue-600"
            >
              Change
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
