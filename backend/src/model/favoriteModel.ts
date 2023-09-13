import { Schema, model } from "mongoose";
import { FavoriteHotel } from "../types/types.js";

const FavoriteHotel = new Schema<FavoriteHotel>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: [true, "Please add user's id"]
  },
  hotelId: {
    type: Schema.Types.ObjectId,
    ref: "hotels",
    required: [true, "Please add hotel's id"]
  }
})

export const favorite_hotel_model = model<FavoriteHotel>("favorite_hotels", FavoriteHotel)