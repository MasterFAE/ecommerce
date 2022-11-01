import React from "react";

type Props = {};

const CategoryCard = (props: Props) => {
  return (
    <div className="cursor-pointer rounded-lg bg-violet-200 p-2 transition-colors hover:bg-violet-300">
      <h1 className="w-full text-center text-xs font-semibold text-violet-900 md:text-base">
        Electronics
      </h1>
    </div>
  );
};

export default CategoryCard;
