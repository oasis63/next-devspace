// pages/api/sampleApi.ts

import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import { generateSecureUserId } from "@/utils/helpers";

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

  switch (req.method) {
    case "GET":
      return getData(req, res);
    case "POST":
      return postData(req, res);
    default:
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
  }
}

async function getData(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = {
      id: Math.floor(Math.random() * 1000),
      key: "key11",
      value: "value111",
      reqType: "GET",
    };
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

async function postData(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }

  const receivedData = req.body;

  try {
    return res
      .status(201)
      .json({ success: true, data: receivedData, reqType: "POST" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}
