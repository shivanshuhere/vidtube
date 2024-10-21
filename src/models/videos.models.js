import mongoose, { Schema } from "mongoose";

const videoSchema = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    videoFile: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: string,
    },
    views: {
      type: Number,
    },
    isPublished: {
      type: Boolean,
    },
  },
  {
    timestamp: true,
  }
);

export const Video = mongoose.model("Video", videoSchema);
