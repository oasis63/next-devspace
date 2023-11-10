// models/User.ts

import mongoose, { Document, Schema } from "mongoose";

export interface UserDocument extends Document {
  userId: string; // Change uniqueCode to userId
  name: string;
  username: string;
  email: string;
  phone: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  interests: string[];
  matchingPreference: {
    age: {
      min: number;
      max: number;
    };
    gender: "Male" | "Female" | "Other";
    distance: number;
  };
  photos: string[];    // string arrays of base64 values
  password: string;
}

const userSchema = new Schema<UserDocument>({
  userId: { type: String, unique: true }, // Change uniqueCode to userId
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
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
  photos: { type: [String], required: true, validate: [arrayMinLength, 'At least one photo is required'] },
  password: { type: String, required: true },
});

// Custom validator to ensure at least one photo is present
function arrayMinLength(value: any[]) {
  return value.length > 0;
}

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
