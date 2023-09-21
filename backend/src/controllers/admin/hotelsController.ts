import { Request, Response } from 'express';
import { hotel_model as HotelModel } from "../../model/hotelModel.js";
import { uploadFile } from "../../utils/helpers.js";
import { Hotel } from '../../types/hotel.interface.js';
import { HydratedDocument } from 'mongoose';

const allCities : string[] = [
  "Warsaw",
  "Krakow",
  "Bangkok",
  "London",
  'Olsztyn',
  "Mediolan",
  "Wroclaw"
];

export const getHotels = async (req : Request, res : Response) => {
  try { 
    const page : number = parseInt(req?.query?.page as string) - 1 || 0;
    const limit : number = parseInt(req.query.limit as string) || 6;
    const searchTxt : string = req.query.search as string || "";
    let queriedCity : string | string[] = req.query.city as string || ""; 
    let sort : string | string[] = req.query.sort as string || "stars";
    const closeToSee : boolean = ((<string>req.query?.closeToSee).toLowerCase() === 'true');
    const closeToMountains : boolean = ((<string>req.query?.closeToMountains).toLowerCase() === 'true');
    const hasParking : boolean = ((<string>req.query?.hasParking).toLowerCase() === 'true');

    if(queriedCity === "") {
      queriedCity = [...allCities];
    }
    req.query.sort ? (sort = sort.split(",")) : (sort = [sort]);
    // Sorting 
    let sortBy = {};
    if(sort[1]) { // user has specified the order(asc || desc)
      sortBy[sort[0]] = sort[1] // sortBy = { stars: 'desc' } itp.
    } else {
      sortBy[sort[0]] = "asc"; // Default sort is ascending
    }
    // Features filters
    const features : {
      "features.closeToSee": boolean,
      'features.closeToMountains': boolean,
      'features.hasParking': boolean,
    } = {
      'features.closeToSee': closeToSee,
      'features.closeToMountains': closeToMountains,
      'features.hasParking': hasParking,
    }
    for(const key in features) { // Usunięcie wszystkich kluczy ustawionych na false
      if(!features[key]) {
        delete features[key];
      }
    }

    let hotels : Hotel[];
    let totalDocuments : number;
    if(Object.keys(features).length === 0) {
      hotels = await HotelModel.find({ 
        name: { $regex: searchTxt, $options: "i"}, 
        "localization.city": { $in: queriedCity },
      })
      .sort(sortBy)
      .skip(page * limit) // skipping 0 docs for first page, 5 docs for second etc.
      .limit(limit);
      totalDocuments = await HotelModel.countDocuments({
        name: { $regex: searchTxt, $options: "i" },
        "localization.city":  { $in: queriedCity }
      });
    } else {
      hotels = await HotelModel.find({ 
        name: { $regex: searchTxt, $options: "i"}, 
        "localization.city": { $in: queriedCity },
        ...features,
      })
      .sort(sortBy)
      .skip(page * limit) // skipping 0 docs for first page, 5 docs for second etc.
      .limit(limit);
      totalDocuments = await HotelModel.countDocuments({
        name: { $regex: searchTxt, $options: "i" },
        "localization.city":  { $in: queriedCity },
        ...features,
      });
    }

    return res.status(200).json({
      message: "Hotels data",
      hotels: hotels,
      allDocuments: totalDocuments,
      limit,
      page: page + 1,
    });

  } catch(err) {
    console.log(err);
    return res.status(500).json({
      message: 'Network error'
    });
  }
}

export const postNewHotel = async (req : Request, res : Response) => {
  const { name, country, localization, stars, features, hotelImage } = req.body;
  let filename : string;
  if(hotelImage) {
    filename = uploadFile(hotelImage.data, hotelImage.name, 'hotels');
  }
  if(name && country && localization && stars && hotelImage) {
    try {
      const newHotel : HydratedDocument<Hotel> = await HotelModel.create({
        name,
        country,
        localization,
        stars: parseInt(stars),
        features,
        hotelImage: filename ? filename : null,
      });
      if(newHotel) {
        return res.status(201).json({
          message: "Successfully added new hotel"
        });
      } else {
        return res.status(401).json({
          message: "Error occurred :("
        })
      }
    } catch(err) {
      console.log(err);
    }
  }
}

export const deleteHotel : (req : Request, res : Response) => Promise<Response> = async (req : Request, res : Response) => {
  const deletedHotel = await HotelModel.deleteOne({ _id: req.params.id });
  if(!deletedHotel) {
    return res.status(401).json({
      message: "Hotel to be deleted not found"
    });
  }
  return res.status(200).json({ 
    message: "Hotel deleted successfully",
  });
}
