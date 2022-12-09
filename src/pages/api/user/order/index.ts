import { NextApiResponse, NextApiRequest } from "next";
import { getServerAuthSession } from "../../../../server/common/get-server-auth-session";

const OrderHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = session.user.id;
  switch (req.method) {
    case "GET":
      const orders = await prisma?.order.findMany({
        where: { userId },
        include: { product: true },
      });
      res.json(orders);
      break;
  }
};

export default OrderHandler;
