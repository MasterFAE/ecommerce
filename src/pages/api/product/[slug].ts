import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { prisma } from "../../../server/db/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  // if(!session) return;
  switch (req.method) {
    case "GET":
      const product = await prisma.product.findFirst({
        where: { slug: req.query.slug },
        include: {
          primaryCategory: { select: { name: true, id: true, slug: true } },
          _count: true,
        },
      });
      res.json(product);
      break;
    default:
      break;
  }
};

export default handler;
