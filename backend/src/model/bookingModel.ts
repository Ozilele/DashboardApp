import { Schema, model } from "mongoose";
import { Booking } from "../types/types.js";

const bookingModel = new Schema<Booking>({
  hotel: {
    type: Schema.Types.ObjectId,
    ref: "hotels",
    required: [true, "Please add hotel's id"]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please add author's id"]
  },
  isPaid: {
    type: Boolean,
    required: [true, "Please add payment's status"]
  },
  paymentMethod: {
    type: String
  },
  duration: {
    from: Date,
    to: Date,
  },
  amount: {
    type: Number,
    required: [true, "Please add amount of booking"],
  }
}, { timestamps: true });

export const booking_model = model<Booking>("bookings", bookingModel);