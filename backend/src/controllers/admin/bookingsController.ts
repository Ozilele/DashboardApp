import { Request, Response } from "express";
import { booking_model as BookingModel } from "../../model/bookingModel.js";
import { Booking } from "../../types/types.js";

export const getBookings = async (req: Request, res: Response) => {
  const page: number = parseInt(req.query?.page as string) - 1 || 0;
  const limit: number = parseInt(req.query?.limit as string) || 5;
  
  try {
    const bookings: Booking[] = await BookingModel.find()
      .skip(page * limit)
      .limit(limit);
    const bookingsCount: number = await BookingModel.countDocuments();
    if(bookings) {
      return res.status(200).json({
        count: bookingsCount,
        bookings,
        message: "Successful request"
      });
    } else {
      return res.sendStatus(400);
    }
  } catch(err) {
    console.log(err);
    return res.sendStatus(500);
  }
}