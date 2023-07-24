import * as fs from 'fs';
import { hotel_model as Hotel } from '../../model/hotelModel.js';
import { uploadFile } from '../../utils/helpers.js';

export const getHotels = async (req, res) => {
  const hotels = await Hotel.find();
  if(hotels) {
    return res.status(201).json({
      hotels: hotels,
      message: "Hotels data"
    });
  } else {
    return res.status(401).json({
      message: "Error occurred :("
    });
  }
}

export const getHotelsForCity = async (req, res) => {
  const city = req.query.city.toString().trim()
  if(!city) {
    return res.status(401).json({
      message: "Invalid city"
    });
  }
  const hotels = await Hotel.find({ 'localization.city' : city })

  if(hotels) {
    return res.status(201).json({
      hotels: hotels,
      message: "Hotels found for city"
    });
  } else { 
    return res.status(201).json({
      message: "No hotels for city found"
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

export const addNewHotel = async (req, res) => {
  console.log(req.file);
  const { hotelName, hotelCountry, hotelCity, hotelAddress, stars, features_see, features_mountains, features_parking } = req.body;
  const savedImg = {
    name: req.file.originalname,
    img: {
      data: fs.readFileSync('./backend/uploads/' + req.file.filename),
      contentType: "image/jpg",
    }
  }
  const newHotel = await Hotel.create({
    name: hotelName,
    country: hotelCountry,
    localization: {
      city: hotelCity,
      address: hotelAddress,
    },
    image: savedImg,
    features: {
      closeToSee: features_see ? true : false,
      closeToMountains: features_mountains ? true : false,
      hasParking: features_parking ? true : false,
    },
    stars: stars,
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
};