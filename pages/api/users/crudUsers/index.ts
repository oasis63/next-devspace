// pages/api/users/crudUsers.ts
// http://localhost:3000/api/users/crudUsers

import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/db";
import User, { UserDocument } from "../../../../models/User";
import logger from "@/lib/logger";

connectDB();

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
      if (req.query.userId) {
        return getUserByUserId(req, res);
      } else if (req.query.city && req.query.country) {
        return getUsersByLocation(req, res);
      } else {
        return getUsers(req, res);
      }
    case "POST":
      return createUser(req, res);
    case "PUT":
      return editUser(req, res);
    case "DELETE":
      return deleteUser(req, res);
    default:
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  console.log("getuses hit");
  try {
    const users = await User.find({}, "-password");
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

async function createUser(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }

  try {
    const { userId, ...userData } = req.body;
    const user = new User({ userId, ...userData });
    await user.save();
    return res.status(201).json({ success: true, data: user });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

async function editUser(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || !req.body) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }

  try {
    const updatedUser = await User.findOneAndUpdate({ userId }, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

async function deleteUser(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }

  try {
    const deletedUser = await User.findOneAndDelete({ userId });

    if (!deletedUser) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

// api/users/crudUsers?userId=yourUserId
async function getUserByUserId(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }

  try {
    const user = await User.findOne({ userId }, "-password");

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user by userId:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

async function getUsersByLocation(req: NextApiRequest, res: NextApiResponse) {
  const { city, country } = req.query;

  if (!city || !country) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }

  try {
    const users = await User.find(
      { "location.city": city, "location.country": country },
      "-password"
    );
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users by location:", error);
    return res.status(500).json({ success: false, error: "Server Error" });
  }
}

// endpoints- references
/*
GET All Users: GET /api/users/crudUsers
GET User by userId: GET /api/users/crudUsers?userId=yourUserId
GET All  Users in the specified city and country. : GET /api/users/crudUsers?city=yourCity&country=yourCountry
POST Create User: POST /api/users/crudUsers
PUT Update User by userId: PUT /api/users/crudUsers?userId=yourUserId
DELETE Delete User by userId: DELETE /api/users/crudUsers?userId=yourUserId



*/
