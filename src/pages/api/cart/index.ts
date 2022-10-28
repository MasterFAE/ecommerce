import type { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const cartIndexHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) return;
  const userId = session.user?.id;

  switch (req.method) {
    case "GET":
      const items = await prisma?.itemInCart.findMany({
        where: { userId },
        include: { item: true },
      });
      res.json({ items });
      break;
  }
};

export default cartIndexHandler;
