import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  category: Category;
};

const CategoryCard = (props: Props) => {
  const { category } = props;
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="cursor-pointer rounded-lg bg-orange-300 p-2 shadow-md shadow-orange-200 transition-colors hover:bg-orange-400">
        <h1 className="items-cen w-full truncate text-center text-xs font-semibold text-orange-900 md:text-base">
          {category.name || "Unknown"}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryCard;
