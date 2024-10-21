import mongoose, { Schema } from "mongoose";

const userSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      required: true,
    },
    watchHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    password: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    refreshToken: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

export const User = mongoose.model("User", userSchema);
