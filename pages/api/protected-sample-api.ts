// pages/api/protected-sample-api.ts
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "./middleware";
import { getMockUserByEmail } from "./mock/sharedMockUsers";

const fetchDataForUser = (email: string | string[]) => {
  const userData = {
    email,
    username: "exampleUser",
  };

  let finalEmail = "";
  if (typeof email !== "string") {
    finalEmail = email[0];
  } else {
    finalEmail = email;
  }

  return getMockUserByEmail(finalEmail);
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
