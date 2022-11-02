// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db/client";

export const list = [
  {
    id: 0,
    name: "Example 1",
    slug: "example1",
    categoryId: 1,
    categoryName: "Examples 1-5",
    options: [],
    price: 510,
    currency: "TL",
    coverImage: "https://picsum.photos/1920/1080",
    detailedImages: [],
    reviews: Math.floor(Math.random() * 101),
  },
  {
    id: 1,
    name: "Example 2",
    slug: "example2",
    categoryId: 1,
    categoryName: "Examples 1-5",
    options: [],
    price: 520.9,
    currency: "TL",
    coverImage: "https://picsum.photos/1920/1080",
    detailedImages: [],
    reviews: Math.floor(Math.random() * 101),
  },
  {
    id: 2,
    name: "Example 3",
    slug: "example3",
    categoryId: 1999.99,
    categoryName: "Examples 1-5",
    options: [],
    price: 5,
    currency: "TL",
    coverImage: "https://picsum.photos/1920/1080",
    detailedImages: [],
    reviews: Math.floor(Math.random() * 101),
  },
  {
    id: 3,
    name: "Example 4",
    slug: "example4",
    categoryId: 1,
    categoryName: "Examples 1-5",
    options: [],
    price: 3999.99,
    currency: "TL",
    coverImage: "https://picsum.photos/1920/1080",
    detailedImages: [],
    reviews: Math.floor(Math.random() * 101),
  },
  {
    id: 4,
    name: "Example 5",
    slug: "example5",
    categoryId: 1,
    categoryName: "Examples 1-5",
    options: [],
    price: 5,
    currency: "TL",
    coverImage: "https://picsum.photos/1920/1080",
    detailedImages: [],
    reviews: Math.floor(Math.random() * 101),
  },
  {
    id: 5,
    name: "Example 5",
    slug: "example6",
    categoryId: 1,
    categoryName: "Examples 6-10",
    options: [],
    price: 5,
    currency: "TL",
    coverImage: "https://picsum.photos/1920/1080",
    detailedImages: [],
    reviews: Math.floor(Math.random() * 101),
  },
];

const examples = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const primaryCategoryId = 2; //for mainPage-1
      const products = await prisma.product.findMany({
        where: { category: { some: { id: 2 } } },
        include: {
          primaryCategory: { select: { name: true, id: true, slug: true } },
        },
        take: 20,
      });
      res.json(products);
      break;
    default:
      res.status(405).send("Unsupported method");
      break;
  }
};

export default examples;
