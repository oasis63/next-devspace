// pages/api/middleware.ts
// import { parse } from "cookie";
import jwt, { JwtPayload } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "jwt-secret-key";

export function generateToken(userTokenData: any): string {
  return jwt.sign({ ...userTokenData }, JWT_SECRET_KEY, { expiresIn: "1h" });
}

export function setTokenCookie(res: NextApiResponse, token: string): void {
  res.setHeader(
    "Set-Cookie",
    `token=${token}; HttpOnly; Secure; SameSite=None; Path=/`
  );
}

export function clearTokenCookie(res: NextApiResponse): void {
  res.setHeader(
    "Set-Cookie",
    `token=; HttpOnly; Secure; SameSite=None; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  );
}

export function withAuth(
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    // const cookies = parse(req.headers.cookie || "");
    // const token = cookies.token;
    let token = req.headers.authorization; // || req.headers["x-access-token"];
    if (token?.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized! Token is not provided" });
    }
    try {
      const decoded = jwt.verify(token, JWT_SECRET_KEY) as JwtPayload;
      req.query.email = decoded.email;
      req.query.admin = decoded.admin;
      return handler(req, res);
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Unauthorized! failed on verifying the token." });
    }
  };
}
