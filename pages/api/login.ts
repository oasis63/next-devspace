// http://localhost:3000/api/login
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import jwt from "jsonwebtoken";
import { generateToken, setTokenCookie } from "./middleware";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt-secret-key";

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

  if (!req.body) {
    res.statusCode = 404;
    res.end("Error");
    return;
  }

  const { email, password } = req.body;
  // check email and password in db .

  const tokenInData = {
    email: email,
    admin: email.includes("admin") && password == "admin",
  };
  const token = generateToken(tokenInData);
  setTokenCookie(res, token);

  //   const generatedToken = jwt.sign(
  //     {
  //       email: email,
  //       admin: email.includes("admin") && password == "admin",
  //     },
  //     JWT_SECRET_KEY
  //   );

  res.json({
    token: token,
  });
}
