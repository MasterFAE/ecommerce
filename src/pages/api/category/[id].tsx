import { NextApiRequest, NextApiResponse } from "next";

const categoryIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const category = await prisma?.category.findFirst({
        where: { id: parseInt(req.query.id) },
        include: { product: { take: 50 } },
      });
      res.json(category);
      break;
  }
};

export default categoryIdHandler;
