import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import ADD_CART_OPERATION from "../../../types/addCartOperation";

const cartIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  switch (req.method) {
    case "GET":
      break;
    case "POST":
      if (!session || !session.user) return;
      const userId = session.user?.id;
      const itemId: number = +req.query.id;
      try {
        const product = await prisma?.product.findFirst({
          where: { id: itemId },
        });
        if (!product) res.status(404).send("Invalid item.");
        const cartItem = await prisma?.itemInCart.findUnique({
          where: { userId_itemId: { userId, itemId } },
        });
        let item;
        let operation;
        if (cartItem) {
          item = await prisma?.itemInCart.update({
            where: { userId_itemId: { userId, itemId } },
            // Send item count in body
            data: { quantity: { increment: req.body.count || 1 } },
            include: { item: true },
          });
          operation = ADD_CART_OPERATION.UPDATE;
        } else {
          item = await prisma?.itemInCart.create({
            data: {
              cart: { connect: { userId } },
              item: { connect: { id: itemId } },
            },
            include: { item: true },
          });
          operation = ADD_CART_OPERATION.CREATE;
        }
        res.json({
          message: "Added item to your cart",
          item: item?.item,
          operation,
        });
      } catch (error) {
        console.error({ error });
        res.status(500).json({ error: "Something went wrong..." });
      }
      break;
  }
};

export default cartIdHandler;
