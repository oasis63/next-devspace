// models/User.ts

import mongoose, { Schema } from "mongoose";
import { UserDocument } from "./UserDocument";

const userSchema = new Schema<UserDocument>({
  userId: { type: String, unique: true, required: true },
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  location: {
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
  },
  interests: { type: [String], default: [] },
  matchingPreference: {
    age: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    distance: { type: Number, required: true },
  },
  photos: {
    type: [String],
    required: true,
    validate: [arrayMinLength, "At least one photo is required"],
  },
  profilePhotoUrl: { type: String, required: true },
  password: { type: String, required: true },

  likedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikedProfiles: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

// Custom validator to ensure at least one photo is present
function arrayMinLength(value: any[]) {
  return value.length > 0;
}

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
