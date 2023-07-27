import * as fs from 'fs';
import { hotel_model as Hotel } from '../../model/hotelModel.js';
import { uploadFile } from '../../utils/helpers.js';

const allCities = [
  "Warsaw",
  "Krakow",
  "Bangkok",
  "London",
  'Olsztyn',
  "Mediolan",
  "Wroclaw"
]

export const getHotels = async (req, res) => {
  try { 
    const page = parseInt(req?.query?.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 6;
    const searchTxt = req.query.search || "";
    let queriedCity = req.query.city || ""; 
    let sort = req.query.sort || "stars";
    const closeToSee = (req.query?.closeToSee?.toLowerCase() === 'true');
    const closeToMountains = (req.query?.closeToMountains?.toLowerCase() === 'true');
    const hasParking = (req.query?.hasParking?.toLowerCase() === 'true');

    if(queriedCity === "") {
      queriedCity = [...allCities];
    }
    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    // Sorting 
    let sortBy = {};
    if(sort[1]) { // user has specified the order(asc || desc)
      sortBy[sort[0]] = sort[1] // sortBy = { stars: 'desc' } itp.
    } else {
      sortBy[sort[0]] = "asc"; // Default sort is ascending
    }
    // Features filters
    const features = {
      'features.closeToSee': closeToSee,
      'features.closeToMountains': closeToMountains,
      'features.hasParking': hasParking,
    }
    for(const key in features) { // Usunięcie wszystkich kluczy ustawionych na false
      if(!features[key]) {
        delete features[key];
      }
    }
    let hotels;
    let totalDocuments;

    if(Object.keys(features).length === 0) {
      hotels = await Hotel.find({ 
        name: { $regex: searchTxt, $options: "i"}, 
        "localization.city": { $in: queriedCity },
      })
      .sort(sortBy)
      .skip(page * limit) // skipping 0 docs for first page, 5 docs for second etc.
      .limit(limit);
      totalDocuments = await Hotel.countDocuments({
        name: { $regex: searchTxt, $options: "i" },
        "localization.city":  { $in: queriedCity }
      });
    } else {
      hotels = await Hotel.find({ 
        name: { $regex: searchTxt, $options: "i"}, 
        "localization.city": { $in: queriedCity },
        ...features,
      })
      .sort(sortBy)
      .skip(page * limit) // skipping 0 docs for first page, 5 docs for second etc.
      .limit(limit);
      totalDocuments = await Hotel.countDocuments({
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

export const postNewHotel = async (req, res) => {
  const { name, country, localization, stars, features, hotelImage } = req.body;
  let filename;
  if(hotelImage) {
    filename = uploadFile(hotelImage.data, hotelImage.name, 'hotels');
  }
  if(name && country && localization && stars && hotelImage) {
    try {
      const newHotel = await Hotel.create({
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

export const deleteHotel = async (req, res) => {
  console.log(req.params.id);
  const deletedHotel = await Hotel.deleteOne({ _id: req.params.id });
  if(!deletedHotel) {
    return res.status(401).json({
      message: "Hotel to be deleted not found"
    });
  }
  return res.status(200).json({ 
    message: "Hotel deleted successfully",
  });
}

// export const addNewHotel = async (req, res) => {
//   const { hotelName, hotelCountry, hotelCity, hotelAddress, stars, features_see, features_mountains, features_parking } = req.body;
//   const savedImg = {
//     name: req.file.originalname,
//     img: {
//       data: fs.readFileSync('./backend/uploads/' + req.file.filename),
//       contentType: "image/jpg",
//     }
//   }
//   const newHotel = await Hotel.create({
//     name: hotelName,
//     country: hotelCountry,
//     localization: {
//       city: hotelCity,
//       address: hotelAddress,
//     },
//     image: savedImg,
//     features: {
//       closeToSee: features_see ? true : false,
//       closeToMountains: features_mountains ? true : false,
//       hasParking: features_parking ? true : false,
//     },
//     stars: stars,
//   });
//   if(newHotel) {
//     return res.status(201).json({
//       message: "Successfully added new hotel"
//     });
//   } else {
//     return res.status(401).json({
//       message: "Error occurred :("
//     })
//   }
// };