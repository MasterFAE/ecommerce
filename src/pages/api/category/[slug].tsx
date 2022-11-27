import { NextApiRequest, NextApiResponse } from "next";

const categoryIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "GET":
      const category = await prisma?.category.findFirst({
        where: { slug: req.query.slug },
        include: {
          primaryProduct: { include: { _count: true }, take: 30 },
          product: { include: { _count: true }, take: 10 },
        },
      });
      res.json(category);
      break;
  }
};

export default categoryIdHandler;
