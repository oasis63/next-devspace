import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../lib/db";
import User from "../../../models/User";
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
  if (req.method === "POST") {
    try {
      const { username, email, password } = req.body;
      const user = new User({ username, email, password });
      await user.save();
      return res.status(201).json({ success: true, data: user });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ success: false, error: "Server Error" });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, error: "Method Not Allowed" });
  }
}
