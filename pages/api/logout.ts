// pages/api/logout.ts
import { NextApiRequest, NextApiResponse } from "next";
import { clearTokenCookie } from "./middleware";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  clearTokenCookie(res);
  res.status(200).json({ message: "Logout successful" });
};

export default handler;
