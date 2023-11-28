// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDB from "@/lib/db";
import logger from "@/lib/logger";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name?: string;
  success?: boolean;
  error?: string;
};

connectDB();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  logger(req, res, async (err: any) => {
    if (err) {
      console.error("Logging middleware error:", err);
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  });
  res.status(200).json({ name: "John Doe" });
}
