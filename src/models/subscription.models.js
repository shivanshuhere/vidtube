import mongoose, { Schema } from "mongoose";

const subscriptionSchema = Schema(
  {
    channel: {
      type: Schema.Types.ObjectId, // to be subscribed
      ref: "User",
    },
    subscriber: {
      type: Schema.Types.ObjectId, // who is going to subscriber
      ref: "User",
    },
  },
  {
    timestamp: true,
  }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
