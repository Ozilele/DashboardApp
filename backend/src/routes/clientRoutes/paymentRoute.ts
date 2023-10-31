import express, { Request, Response } from "express";
import Stripe from "stripe";
import * as dotenv from 'dotenv';
import { booking_model as BookingModel } from '../../model/bookingModel.js';
import { hotel_model as HotelModel } from "../../model/hotelModel.js";
import { protect } from "../../middleware/authMiddleware.js";
import { Booking, Req } from "../../types/types.js";
import { HydratedDocument } from "mongoose";
import { Hotel } from "../../types/hotel.interface.js";
import bodyParser from "body-parser";

dotenv.config();

const router : express.Router = express.Router();
const stripe : Stripe  = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
  maxNetworkRetries: 1,
  timeout: 1000 * 180 // 3 mins 
});
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

router.post("/checkout", protect, async (req: Req, res: Response) => { // Stripe Checkout Session to create a customer
  const userID = req?.user?._id; // id of a customer
  const { price, hotelID } = req?.body;

  if(!hotelID || !price) return res.status(400).json({ msg: "Hotel's id and a price are required" });

  const hotel: Hotel = await HotelModel.findOne({ _id: hotelID });

  const booking: HydratedDocument<Booking> = await BookingModel.create({
    hotel: hotelID,
    user: userID,
    isPaid: false,
    // paymentMethod: // payment method (cart, etc.)
    // duration: // duration of the accomodation in a hotel
    amount: price,
  });

  const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create({ // Checkout session
    mode: 'payment',
    phone_number_collection: {
      enabled: true,
    },
    line_items: [
      {
        // price: String(req.query.price),
        price_data: {
          currency: 'USD',
          product_data: {
            name: hotel.name,
          },
          unit_amount: price * 100,
        },
        quantity: 1,
      }
    ],
    success_url: "http://localhost:3000/payments/success",
    cancel_url: "http://localhost:3000/payments/cancel", // user must be logged in to create a payment 
    metadata: { // once the user has paid, load the session and use the metadata to find order which was created and change payment status
      bookingId: booking._id.toString(),
    }
  });

  return res.status(201).json({
    url: session.url,
  });
});

router.post("/webhook", bodyParser.raw({ type: 'application/json' }), async (req: Request, res: Response) => {
  const signature = req.headers['stripe-signature'];
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch(err) {
    console.log(err);
    console.log('Webhook signature verification failed');
    return res.sendStatus(400);
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if(event.type === "checkout.session.completed") { // Change the payment status of a booking 
    const booking = await BookingModel.findOne({ _id: session?.metadata?.bookingId });
    if(booking) {
      booking.isPaid = true;
      await booking.save();
    }
  }

  return res.sendStatus(200);
});

export default router;