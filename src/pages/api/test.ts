import { CATEGORY_TYPE } from "@prisma/client";

const testHandler = async (req, res) => {
  let category = await prisma?.category.findMany({});
  if (category?.length === 0) {
    await prisma?.category.createMany({
      data: [
        { name: "Electronics" },
        { name: "Housing" },
        { name: "Foods" },
        { name: "Clothing" },
        { name: "MainPage-1" },
        { name: "Apple", type: CATEGORY_TYPE.MANUFACTURER },
        { name: "MainPage-Deals" },
      ],
    });
    category = await prisma?.category.findMany({});
  }

  const electronics = category?.find((e) => e.name === "Electronics");
  const housing = category?.find((e) => e.name === "Housing");
  const foods = category?.find((e) => e.name === "Foods");
  const clothing = category?.find((e) => e.name === "Clothing");
  const mainPage = category?.find((e) => e.name === "MainPage-1");
  const mainPage_Deals = category?.find((e) => e.name === "MainPage-Deals");
  const products = await prisma?.product.createMany({
    data: [
      {
        name: "Ipad",
        slug: "ipad-new",
        coverImage: "",
        detailedImage: [],
        price: 16000,
        primaryCategoryId: mainPage?.id,
      },
      {
        name: "Iphone 14 256GB",
        slug: "iphone-14-m256",
        coverImage: "",
        detailedImage: [],
        price: 46777,
        primaryCategoryId: mainPage?.id,
      },
      {
        name: "Iphone 14 512GB",
        slug: "iphone-14-m512",
        coverImage: "",
        detailedImage: [],
        price: 47777,
        primaryCategoryId: mainPage?.id,
      },
      {
        name: "Iphone 14 Pro 512GB",
        slug: "iphone-14-pro-m512",
        coverImage: "",
        detailedImage: [],
        price: 48888,
        primaryCategoryId: mainPage?.id,
      },
    ],
  });
  res.json(products);
};

export default testHandler;
