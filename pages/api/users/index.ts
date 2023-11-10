// http://localhost:3000/api/users

import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/db";
import logger from "@/lib/logger";

// connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger(req, res, async (err: any) => {
    if (err) {
      console.error("Logging middleware error:", err);
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  });
  return res.status(500).json({ success: true, error: false, message: "Hello From users index.ts file."});
}
