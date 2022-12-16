import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  FaBars,
  FaDoorOpen,
  FaShoppingCart,
  FaSignInAlt,
  FaUser,
} from "react-icons/fa";
import { MdOutlineLogin } from "react-icons/md";
import { useSelector } from "react-redux";
import { storeType } from "../redux/store";
import MobileAccountDetailsNav from "./MobileAccountDetailsNav";

type Props = {};

const MobileNavbar = (props: Props) => {
  const [userModal, setModal] = useState(false);
  const { user, cart } = useSelector((state: storeType) => state);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let itemQuantity = 0;
    for (let i = 0; i < cart.items.length; i++) {
      itemQuantity += cart.items[i]?.quantity;
    }
    setTotalItems(itemQuantity);
  }, [cart.items]);

  return (
    <div className="sm:hidden">
      {userModal && (
        <MobileAccountDetailsNav setModal={setModal}></MobileAccountDetailsNav>
      )}
      <div className="invisible  h-[4rem]"></div>
      <header className="fixed top-0 left-0 z-20 flex h-[3.5rem] w-full items-center justify-between bg-neutral-900 px-4 text-white">
        <Link href={"/"}>
          <div>Logo</div>
        </Link>
        <div className="flex flex-row gap-x-2">
          <Link href={"/cart"}>
            <button className="flex rounded-lg p-1 text-lg text-neutral-200 transition-colors hover:text-neutral-400 focus:bg-neutral-700 focus:text-neutral-400">
              <FaShoppingCart />
              <div className="-ml-2 -mt-2 rounded-lg bg-orange-500 px-1 text-xs text-white">
                {totalItems}
              </div>
            </button>
          </Link>

          <button
            onClick={() => setModal(true)}
            className="rounded-lg p-1 text-lg text-neutral-200 transition-colors hover:text-neutral-400 focus:bg-neutral-700 focus:text-neutral-400"
          >
            <FaBars></FaBars>
          </button>
        </div>
      </header>
    </div>
  );
};

export default MobileNavbar;
