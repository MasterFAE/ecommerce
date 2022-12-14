import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import ADD_CART_OPERATION from "../../../types/addCartOperation";
import { prisma } from "../../../server/db/client";

const cartIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) return;

  const userId = session.user?.id;

  const itemId: number = +req.query.id;

  switch (req.method) {
    case "DELETE":
      const result = await prisma.itemInCart.delete({
        where: { userId_itemId: { userId, itemId } },
      });
      res.status(200).json(result);
      break;
    case "PATCH":
      try {
        const cartItem = await prisma.itemInCart.update({
          where: { userId_itemId: { userId, itemId } },
          data: { quantity: req.body.quantity },
        });
        res.status(200).json(cartItem);
      } catch (error) {
        console.error({ error });
        res.status(500).json({ error: "Something went wrong..." });
      }
      break;
    case "POST":
      try {
        const product = await prisma.product.findFirst({
          where: { id: itemId },
        });
        if (!product) res.status(404).send("Invalid item.");

        const item = await prisma.itemInCart.create({
          data: {
            cart: {
              connectOrCreate: { where: { userId }, create: { userId } },
            },
            item: { connect: { id: itemId } },
          },
          include: { item: true },
        });
        res.json({
          message: "Added item to your cart",
          item,
        });
      } catch (error) {
        console.error({ error });
        res.status(500).json({ error: "Something went wrong..." });
      }
      break;
  }
};

export default cartIdHandler;
