import argon2 from "argon2";

const RegisterHandler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const { email, password, firstName, lastName, phoneNumber } = JSON.parse(
        req.body
      );
      if (!email || !password || !firstName || !lastName || !phoneNumber) {
        res.status(400).json({ error: "Invalid credentials" });
        return;
      }
      const duplicate = await prisma?.user.findMany({
        where: { OR: [{ email }, { phoneNumber }] },
      });
      if (duplicate?.length > 0) {
        res
          .status(401)
          .json({ error: "User with this credentials already exists" });
        return;
      }
      const maskedPassword = await argon2.hash(password);
      const user = await prisma?.user.create({
        data: {
          email,
          password: maskedPassword,
          firstName,
          lastName,
          phoneNumber,
        },
      });
      if (!user) {
        res.status(500).json({ error: "Error while creating user" });
        return;
      }
      res.status(200).json({ msg: "Done" });
  }
};

export default RegisterHandler;
