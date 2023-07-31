import { Schema, model } from "mongoose";
import { Hotel } from "../types/hotel.interface.js";

const featuresSchema = new Schema({
  closeToSee: Boolean,
  closeToMountains: Boolean,
  hasParking: Boolean,
});

const imgSchema = new Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  }
});

const hotelModel = new Schema<Hotel>({
  name: {
    type: String,
    required: [true, "Please add a name"]
  },
  country: {
    type: String,
    required: [true, "Please add a hotel's country"]
  },
  localization: {
    city: String,
    address: String,
  },
  hotelImage: {
    type: String,
    required: [true, "Please add a hotel's image"]
  },
  stars: {
    type: Number,
    required: [true, "Please add a number of stars"]
  },
  image: imgSchema,
  features: featuresSchema
});

// hotelModel.statics.findByCountry = function(countryName) { // static method for a model
//   return this.find({ country: new RegExp(countryName, "i") }) // where query to get country and to have case insensitive query 
// }

export const hotel_model = model<Hotel>("hotels", hotelModel);