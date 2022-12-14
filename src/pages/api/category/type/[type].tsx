import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../server/db/client";

const categoryTypeFetcher = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const category = await prisma.category.findMany({
        where: { type: req.query.type },
      });
      res.json(category);
      break;
  }
};

export default categoryTypeFetcher;
