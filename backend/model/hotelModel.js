import mongoose from "mongoose";

const featuresSchema = new mongoose.Schema({
  closeToSee: Boolean,
  closeToMountains: Boolean,
  hasParking: Boolean,
});

const imgSchema = new mongoose.Schema({
  name: String,
  img: {
    data: Buffer,
    contentType: String,
  }
});

const hotelModel = new mongoose.Schema({
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
  image: imgSchema,
  features: featuresSchema,
  stars: {
    type: Number,
    required: [true, "Please add a number of stars"]
  }
});

hotelModel.statics.findByCountry = function(countryName) { // static method for a model
  return this.find({ country: new RegExp(countryName, "i") }) // where query to get country and to have case insensitive query 
}

export const hotel_model = mongoose.model("hotels", hotelModel);