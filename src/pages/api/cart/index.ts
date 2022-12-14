import { OrderStatus } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

const cartIndexHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) return;
  const userId = session.user?.id;

  switch (req.method) {
    case "GET":
      const items = await prisma.itemInCart.findMany({
        where: { userId },
        include: { item: true },
      });
      res.json({ items });
      break;
    case "DELETE":
      await prisma.itemInCart.deleteMany({ where: { userId } });
      res.json({ message: "OK." });
      break;
    case "POST":
      // data is loaded with address and card details
      const { items: _items, data } = JSON.parse(req.body);
      if (_items.length === 0) {
        res.status(400).json({ error: "Cart is empty" });
        return;
      }
      const dbItems = await prisma.itemInCart.findMany({ where: { userId } });
      if (!dbItems || dbItems.length === 0) {
        res.status(400).json({ error: "Cart is empty" });
        return;
      }

      // Compare 2 arrays if they're same
      // Compare total with db price if theyre same
      const sortedBody = _items.slice().sort();
      const result: boolean =
        dbItems?.length === sortedBody.length &&
        dbItems
          ?.slice()
          .sort()
          .every(function (value, index) {
            return (
              value.itemId === sortedBody[index].itemId &&
              value.quantity === sortedBody[index].quantity
            );
          });

      if (!result) {
        // Send error to frontend and re-fetch cart items
        res.status(400).json({ error: "Something went wrong with your cart" });
        return;
      }

      const order = await prisma.order.createMany({
        data: dbItems.map((e) => ({
          productId: e.itemId,
          userId,
          quantity: e.quantity,
          status: OrderStatus.WAITING,
        })),
      });
      // { userId: userId, itemId: dbItems.map(e => e.itemId)}
      await prisma.itemInCart.deleteMany({
        where: { userId, itemId: { in: dbItems.map((e) => e.itemId) } },
      });

      if (!order) {
        res.status(400).json({
          error: "Something went wrong while trying to create an order.",
        });
        return;
      }
      res.json({ message: "OK." });
      break;
  }
};

export default cartIndexHandler;
