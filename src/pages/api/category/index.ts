import { NextApiRequest, NextApiResponse } from "next";

const categoryIndexHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case "GET":
      const categories = await prisma?.category.findMany({
        take: 10,
      });
      res.json(categories);
      break;
  }
};

export default categoryIndexHandler;
