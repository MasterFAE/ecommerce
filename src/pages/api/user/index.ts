import { NextApiRequest, NextApiResponse } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";

const userHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });

  switch (req.method) {
    case "GET":
      const user = await prisma?.user.findFirst({
        where: { email: session?.user?.email },
        include: { cart: true },
      });
      if (!user) res.status(401).send("Unauthorized");

      user?.password && delete user?.password;
      user?.emailVerified && delete user?.emailVerified;
      res.json(user);

      break;

    default:
      break;
  }
};

export default userHandler;
