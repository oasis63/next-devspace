// http://localhost:3000/api/login
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import jwt from "jsonwebtoken";
import { generateJWT, setTokenCookie } from "./middleware";
import {
  addMockUser,
  checkUserPresence,
  getAllMockUsers,
} from "./mock/sharedMockUsers";
import { hashPassword } from "./utils/security/bcryptUtils";

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

  try {
    if (req && req.method === "POST") {
      const reqbody = req.body;

      console.log("reqbody: ", reqbody);

      const {
        username,
        email,
        password,
        name,
        age,
        gender,
        matchingPreference,
      } = reqbody;

      //   faking api call
      const userData = checkUserPresence(email, username);
      if (userData) {
        res.status(400).json({
          error: userData.message,
        });
        return;
      }

      const hashedPassword = await hashPassword(password);

      const newUserData = {
        id: Date.now().toString(),
        username: username,
        name: name,
        email: email,
        password: hashedPassword,
        age: age,
        gender: gender,
        matchingPreference: matchingPreference,
      };

      console.log("newUserData  : ", newUserData);

      //   faking backend db
      await addMockUser(newUserData);

      const sharedMockUsers = getAllMockUsers();

      res.status(200);
      res.json(sharedMockUsers);
    } else {
      res.status(405).json({ error: "Method Not Allowed" });
    }
  } catch (error) {
    res.statusCode = 500;
    console.error("Error:", error);
    res.json({ error: "Internal Server Error" });
  }
}
