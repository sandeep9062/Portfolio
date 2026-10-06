import mongoose from "mongoose";
import type { Model } from "mongoose";

export interface IUser {
  email: string;
  passwordHash: string;
  role: "user" | "admin";
  googleId?: string;
  name?: string;
  picture?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    googleId: {
      type: String,
    },
    name: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  { timestamps: true },
);

const User: Model<IUser> =
  (mongoose.models.User as Model<IUser>) ||
  mongoose.model<IUser>("User", userSchema);

export default User;
