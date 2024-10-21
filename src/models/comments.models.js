import mongoose, { Schema } from "mongoose";

const commentSchema = Schema(
  {
    video: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
    },
  },
  {
    timestamp: true,
  }
);

export const Comment = mongoose.model("Comment", commentSchema);
