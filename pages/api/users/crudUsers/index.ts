// pages/api/users/crudUsers.ts
// http://localhost:3000/api/users/crudUsers

import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../../lib/db";
import User from "../../../../models/User";
import { UserDocument } from "@/models/UserDocument";
import logger from "@/lib/logger";
import { generateSecureUserId } from "@/utils/helpers";

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
    case "PATCH":
      // Add or remove userId from likedProfiles or dislikedProfiles
      return updateProfilePreference(req, res);
    default:
      return res
        .status(405)
        .json({ success: false, error: "Method Not Allowed" });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse) {
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
    // const counterDoc = await Counter.findOneAndUpdate(
    //   { _id: "userId" },
    //   { $inc: { seq: 1 } },
    //   { new: true, upsert: true }
    // );
    // const { seq } = counterDoc || { seq: 1 };
    // const user = new User({ userId: seq, ...req.body });

    // const { userId, ...userData } = req.body;
    // const user = new User({ userId, ...userData });
    // await user.save();

    const userId = generateSecureUserId();

    const user = new User({ userId, ...req.body });
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

// New function to handle likedProfiles and dislikedProfiles
async function updateProfilePreference(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;

  if (!userId || !req.body.action || !req.body.targetUserId) {
    return res.status(400).json({ success: false, error: "Bad Request" });
  }

  try {
    const user = await User.findOne({ userId });

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const { action, targetUserId } = req.body;

    if (action === "like") {
      if (!user.likedProfiles.includes(targetUserId)) {
        user.likedProfiles.push(targetUserId);
        await user.save();
      }
    } else if (action === "dislike") {
      if (!user.dislikedProfiles.includes(targetUserId)) {
        user.dislikedProfiles.push(targetUserId);
        await user.save();
      }
    } else if (action === "unlike") {
      user.likedProfiles = user.likedProfiles.filter(
        (id) => id !== targetUserId
      );
      await user.save();
    } else if (action === "undislike") {
      user.dislikedProfiles = user.dislikedProfiles.filter(
        (id) => id !== targetUserId
      );
      await user.save();
    } else {
      return res.status(400).json({ success: false, error: "Invalid action" });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error("Error updating profile preference:", error);
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


Like a user: PATCH /api/users/crudUsers?userId=yourUserId with a JSON body { "action": "like", "targetUserId": "likedUserId" }
Unlike a user: PATCH /api/users/crudUsers?userId=yourUserId with a JSON body { "action": "unlike", "targetUserId": "likedUserId" }
Dislike a user: PATCH /api/users/crudUsers?userId=yourUserId with a JSON body { "action": "dislike", "targetUserId": "dislikedUserId" }
Undislike a user: PATCH /api/users/crudUsers?userId=yourUserId with a JSON body { "action": "undislike", "targetUserId": "dislikedUserId" }


*/
