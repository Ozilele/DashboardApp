import express from "express";
import Stripe from "stripe";
import { protect } from "../../middleware/authMiddleware.js";

const router : express.Router = express.Router();
const stripe : Stripe  = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

router.post("/checkout", protect, async (req, res) => { // Stripe Checkout Session to create a customer and
  const session : Stripe.Checkout.Session = await stripe.checkout.sessions.create({ // Checkout session
    payment_method_types: ['card'],
    mode: 'payment',
    line_items: [
      {
        price: String(req.query.price),
        quantity: 1,
      }
    ],
    success_url: "http://localhost:3000/payments/success",
    cancel_url: "http://localhost:3000/payments/cancel", // user must be logged in to create a payment 
  });
  res.send(JSON.stringify({
    url: session.url,
  }));
});

router.post("/webhook", (req, res) => {
  let data;
  let eventType;
  let event;
  let signature = req.headers['stripe-signature'];
  
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK,
    );
  } catch(err) {
    console.log('Webhook signature verification failed');
    return res.sendStatus(404);
  }

  data = event.data;
  eventType = event.type;

  switch(event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log("Payment was successful");
      break;
  }

});


export default router;