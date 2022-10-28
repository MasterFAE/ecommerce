import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

type Props = {
  onClick?: any;
  size?: number;
  liked?: boolean;
};

const LikeButton = (props: Props) => {
  return (
    <button
      onClick={props.onClick}
      className="rounded-full bg-red-600 bg-opacity-90 p-2 text-lg text-white transition-all hover:bg-red-700"
    >
      {!props.liked ? (
        <FaRegHeart size={props.size || 20} />
      ) : (
        <FaHeart size={props.size || 20} />
      )}
    </button>
  );
};

export default LikeButton;
