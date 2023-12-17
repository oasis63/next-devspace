// pages/api/protected-api.ts
import { NextApiRequest, NextApiResponse } from "next";
import { withAuth } from "./middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const userId = req.query.userId as string; // Access the user ID from the decoded token

  // Your protected API route logic here
  res.status(200).json({
    message: `Hello, user ${userId}! This is a protected API endpoint.`,
  });
};

export default withAuth(handler);
