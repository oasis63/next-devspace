// pages/api/protected-sample-api.ts
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "./middleware";

const fetchDataForUser = (email: any) => {
  const userData = {
    email,
    username: "exampleUser",
  };

  return userData;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, admin } = req.query;

  console.log("req.query : ", req.query);
  if (!email) {
    return res.status(401).json({ message: "Unauthorized! api level" });
  }

  const userData = fetchDataForUser(email);

  res.status(200).json(userData);
};

export default withAuth(handler);
