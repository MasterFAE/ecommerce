import React from "react";
import { FaStar } from "react-icons/fa";

type Props = {
  count: number;
};

const ReviewStars = (props: Props) => {
  const { count } = props;

  return (
    <div className="flex flex-row items-center">
      {count > 0 &&
        Array(count)
          .fill(null)
          .map((i) => <FaStar size={18} className="text-yellow-500" />)}
      {Array(5 - count)
        .fill(null)
        .map((i) => (
          <FaStar size={18} className="text-neutral-300" />
        ))}

      <h1 className="ml-2 cursor-pointer text-center text-sm font-medium text-neutral-500 hover:underline">
        +{count}
      </h1>
    </div>
  );
};

export default ReviewStars;
