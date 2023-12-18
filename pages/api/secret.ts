// http://localhost:3000/api/login
import type { NextApiRequest, NextApiResponse } from "next";
import logger from "@/lib/logger";
import jwt from "jsonwebtoken";

const KEY = "afdljfaslj23fdasljre";

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

  const { token } = req.body;
  const { admin } = jwt.verify(token, KEY) as { [key: string]: string };

  console.log("admin : ", admin);

  if (admin) {
    res.json({
      secretAdminCode: 13232,
    });
  } else {
    res.json({
      admin: false,
    });
  }

  //   res.json({
  //     token: generatedToken,
  //   });
}
