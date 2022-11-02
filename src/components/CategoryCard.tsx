import { Category } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  category: Category;
};

const CategoryCard = (props: Props) => {
  const { category } = props;
  console.log({ category });
  return (
    <Link href={`/category/${category.slug}`}>
      <div className="cursor-pointer rounded-lg bg-violet-200 p-2 transition-colors hover:bg-violet-300">
        <h1 className="w-full text-center text-xs font-semibold text-violet-900 md:text-base">
          {category.name || "Unknown"}
        </h1>
      </div>
    </Link>
  );
};

export default CategoryCard;
