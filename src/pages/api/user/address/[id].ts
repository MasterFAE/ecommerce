import { NextApiResponse, NextApiRequest } from "next";
import { getServerAuthSession } from "../../../../server/common/get-server-auth-session";
import { prisma } from "../../../../server/db/client";

const AddressIdHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    res.status(401).send("Unauthorized");
    return;
  }

  const userId = session.user.id;
  const id = parseInt(req.query.id);
  switch (req.method) {
    case "GET":
      const _address = await prisma.address.findFirst({
        where: { AND: { userId, id } },
      });
      if (!_address) res.status(404).send("Not found");
      res.json(_address);
      break;
    case "UPDATE":
      //TODO
      break;

    case "DELETE":
      const address = await prisma.address.findUnique({
        where: { id },
        select: { userId: true },
      });
      if (!address || !address.userId) {
        res.status(401).send("Unauthorized");
        return;
      }
      await prisma.address.delete({ where: { id } });
      res.send("Address deleted successfully");
  }
};

export default AddressIdHandler;
