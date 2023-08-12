import { Request, Response } from 'express';
import { hotel_model as HotelModel } from '../../model/hotelModel.js';
import { Hotel } from '../../types/hotel.interface.js';

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


