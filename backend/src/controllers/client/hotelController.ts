import { Request, Response } from 'express';
import { hotel_model as HotelModel } from '../../model/hotelModel.js';
import { Hotel } from '../../types/hotel.interface.js';
import { FavoriteHotel, Req } from '../../types/types.js';
import { favorite_hotel_model as FavoriteHotelModel } from '../../model/favoriteModel.js';
import { getOrSetCache } from '../../utils/helpers.js';

export const getHotel = async (req: Request, res: Response) => {
  const id  = req.params.id;
  try {
    if(id) {
      let hotel: Hotel;
      hotel = await getOrSetCache<Hotel>(`hotel:id:${id}`, async () => {
        const hotelData: Hotel = await HotelModel.findOne({ _id: id }).lean();
        return hotelData;
      });
      if(hotel) {
        return res.status(200).json({
          message: "Hotel found",
          hotel,
        });
      } else {
        return res.status(404).json({
          message: "Hotel of this id not found"
        });
      }
    }
    return res.status(404).json({
      message: "Error - Id of the hotel not received"
    });
  }
  catch(err) {
    return res.status(500).json({
      message: "Network error"
    });
  }
}

export const isHotelFavorite = async (req: Req, res: Response) => {
  const { hotelId } = req.params;
  const userId = req.user?._id.toString();
  try {
    if(userId && hotelId) {
      const hotel = await FavoriteHotelModel.findOne({
        $and: [{ userId: userId, hotelId: hotelId }]
      });
      if(hotel) {
        return res.status(200).json({
          message: "This hotel is in favorites",
          hotel
        });
      } else {
        return res.status(200).json({
          message: "This hotel is not in favorites"
        });
      }
    }
  } catch(err) {
    return res.status(500).json({
      message: "Network error"
    });
  }
}

export const getFavorites = async (req: Request, res: Response) => {
  const { userId } = req.query;
  try {
    if(userId) {
      const listOfFavorites: FavoriteHotel[] = await FavoriteHotelModel.find({
        userId: userId
      }).lean()
      if(listOfFavorites) {
        return res.status(201).json({
          message: "Favorite hotels found for user",
          listOfFavorites          
        });
      } else {
        return res.status(404).json({
          message: "Found error retrieving the list of favorites"
        });
      }
    } else {
      return res.status(404).json({
        message: "Invalid request's data"
      }) 
    }
  } catch(err) {
    return res.status(500).json({
      message: "Network error"
    });
  }
}

export const addToFavorites = async (req: Req, res: Response) => {
  const userId = req.user?._id;
  const { hotelId } = req.body;
  try {
    if(userId && hotelId) {
      const favoriteHotel = await FavoriteHotelModel.create({
        userId,
        hotelId
      });
      if(favoriteHotel) {
        return res.status(200).json({
          message: "Successfully added to favorites"
        });
      } else {
        return res.status(404).json({
          message: "Error adding to favorites"
        });
      }
    }
  } catch(err) {
    return res.status(500).json({
      message: "Network error"
    });
  }
}

export const deleteFromFavorites = async (req: Request, res: Response) => {
  const id = req.params.hotelId;
  try {
    const isDeleted = await FavoriteHotelModel.deleteOne({ hotelId: id });
    console.log(isDeleted);
    if(isDeleted) {
      return res.status(200).json({
        message: "Successfully deleted from favorites"
      });
    } else {
      return res.status(404).json({
        message: "Error deleting from favorites"
      });
    }
  } catch(err) {
    return res.status(500).json({
      message: "Network error"
    });
  }
}


