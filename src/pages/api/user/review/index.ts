import { NextApiResponse, NextApiRequest } from "next";
import { getServerAuthSession } from "../../../../server/common/get-server-auth-session";

const ReviewHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = session.user.id;
  switch (req.method) {
    case "GET":
      const review = await prisma?.review.findMany({ where: { userId } });
      console.log({ review });
      res.json(review);
      break;
  }
};

export default ReviewHandler;
