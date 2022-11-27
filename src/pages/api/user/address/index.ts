import { NextApiResponse, NextApiRequest } from "next";
import { getServerAuthSession } from "../../../../server/common/get-server-auth-session";

const AddressHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) {
    res.status(401).send("Unauthorized");
    return;
  }
  const userId = session.user.id;
  switch (req.method) {
    case "GET":
      const address = await prisma?.address.findMany({ where: { userId } });
      res.json(address);
      break;
    case "POST":
      const {
        name,
        country,
        userName,
        userSurname,
        phone_number,
        type,
        districtName,
        neighbourHoodName,
        cityName,
        identityNo,
        isCurrent,
      } = req.body;
      try {
        await prisma?.address.create({
          data: {
            userName,
            userSurname,
            name,
            country,
            user: { connect: { id: userId } },
            phone_number,
            type,
            districtName,
            neighbourHoodName,
            cityName,
            identityNo,
            isCurrent,
          },
        });
      } catch (e) {
        res.status(500).send("Error while creating new address");
      }
      break;
  }
};

export default AddressHandler;
