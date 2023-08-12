import { Schema, model } from "mongoose";
import { Review } from "../types/types.js";

const reviewModel = new Schema<Review>({
  rating: {
    type: Number,
    required: [true, "Please add review's rating"]
  },
  content: {
    type: String,
  },
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "hotels",
    required: [true, "Please add hotel's id"]
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please add author's id"]
  }
}, { timestamps: true });


export const review_model = model<Review>("reviews", reviewModel);