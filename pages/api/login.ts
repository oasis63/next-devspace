// http://localhost:3000/api/login
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import { generateJWT, setTokenCookie } from "./middleware";
import { getAllMockUsers, getMockUserByEmail } from "./mock/sharedMockUsers";
import { verifyPassword } from "./utils/security/bcryptUtils";

// mock shared data
const sharedMockUsers = getAllMockUsers();

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
    if (req && req.method === "POST") {
      if (!req.body) {
        res.statusCode = 404;
        res.json({ error: "Error" });
        return;
      }
      const { email, password } = req.body;
      // check email and password in db .
      const userData = getMockUserByEmail(email);
      if (userData) {
        const savedHashedPassword = userData.password;

        const passwordMatch = await verifyPassword(
          password,
          savedHashedPassword
        );

        if (passwordMatch) {
          const tokenParamData = {
            email: email,
            admin: email.includes("admin") && password == "admin",
          };

          const token = generateJWT(tokenParamData);

          setTokenCookie(res, token);

          res.status(200);
          res.json({
            token: token,
          });
        } else {
          res.status(401).json({ error: "Incorrect password" });
          return;
        }
      } else {
        res.status(404);
        res.json({ error: "User not found" });
        return;
      }
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
      return;
    }
  } catch (error) {
    res.statusCode = 500;
    console.error("Error:", error);
    res.json({ error: "Internal Server Error" });
  }
}
