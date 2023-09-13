import { Request, Response } from 'express';
import { hotel_model as HotelModel } from '../../model/hotelModel.js';
import { Hotel } from '../../types/hotel.interface.js';
import { FavoriteHotel, Req } from '../../types/types.js';
import { favorite_hotel_model as FavoriteHotelModel } from '../../model/favoriteModel.js';

export const getHotel = async (req: Request, res: Response) => {
  const id  = req.params.id;
  try {
    if(id) {
      const hotel : Hotel = await HotelModel.find({ _id: id }).lean();
      if(hotel) {
        return res.status(201).json({
          message: "Hotel found",
          hotel,
        });
      } else {
        return res.status(404).json({
          message: "Not found"
        });
      }
    }
    return res.status(404).json({
      message: "Not found"
    });
  }
  catch(err) {
    return res.status(500).json({
      message: "Network error"
    });
  }
}

export const isHotelFavorite = async (req: Request, res: Response) => {
  const { userId, hotelId } = req.query;
  try {
    if(userId && hotelId) {
      const hotel = await FavoriteHotelModel.findOne({
        $and: [{ userId: userId, hotelId: hotelId }]
      });
      if(hotel) {
        return res.status(201).json({
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

export const addToFavorites = async (req: Request, res: Response) => {
  const { userId, hotelId } = req.body
  try {
    if(userId && hotelId) {
      const favoriteHotel = await FavoriteHotelModel.create({
        userId,
        hotelId
      });
      if(favoriteHotel) {
        return res.status(201).json({
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
  const id = req.params.hotelId
  try {
    const isDeleted = await FavoriteHotelModel.deleteOne({ hotelId: id })
    console.log(isDeleted);
    if(isDeleted) {
      return res.status(201).json({
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
    })
  }
}


