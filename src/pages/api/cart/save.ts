import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import ADD_CART_OPERATION from "../../../types/addCartOperation";
import { prisma } from "../../../server/db/client";

const saveHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) return;

  const userId = session.user?.id;

  switch (req.method) {
    case "POST":
      let data = JSON.parse(req.body);
      const cartData = await prisma.itemInCart.findMany({ where: { userId } });
      let duplicated = [];

      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < cartData.length; j++) {
          if (!data[i]) continue;
          if (cartData[j]?.itemId == data[i].item.id) {
            duplicated.push({
              itemId: data[i].item.id,
              quantity: cartData[j]?.quantity + data[i].quantity,
              userId,
            });
            data.splice(i, 1);
            i = -1;
          }
        }
      }

      let arr = data.map((e) => ({
        itemId: e.item.id,
        quantity: e.quantity,
        userId,
      }));
      console.log({ arr });
      console.log({ duplicated });

      if (arr.length > 0) {
        await prisma.itemInCart.createMany({ data: arr });
      }
      // Needs improvement
      if (duplicated.length > 0) {
        await duplicated.map(async (e) => {
          await prisma.itemInCart.updateMany({
            where: {
              userId: e.userId,
              itemId: e.itemId,
            },
            data: { quantity: e.quantity },
          });
        });
      }
      res.json({ message: "OK" });
    default:
      res.status(400).json({ message: "Unsupported method" });
  }
};
export default saveHandler;
