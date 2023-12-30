// http://localhost:3000/api/siteusersApi
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import { generateJWT, setTokenCookie } from "./middleware";
import { getAllMockUsers, getMockUserByEmail } from "./mock/sharedMockUsers";
import { verifyPassword } from "./utils/security/bcryptUtils";

// mock shared data
const sharedMockUsers = getAllMockUsers();

async function mockUsers() {
  return new Promise((resolve) => resolve(sharedMockUsers));
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  logger(req, res, async (err: any) => {
    if (err) {
      console.error("Logging middleware error:", err);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  });

  try {
    const users = await mockUsers();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.statusCode = 500;
    console.error("Error:", error);
    res.json({ error: "Internal Server Error" });
  }
}
