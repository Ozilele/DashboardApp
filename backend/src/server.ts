import express from 'express';
import * as dotenv from 'dotenv';
import cors from "cors";
import path from 'path';
import cookieParser from 'cookie-parser';
import authRoutes from "./routes/auth.js";
import clientRoutes from './routes/clientRoutes/clientRoute.js';
import paymentRoutes from './routes/clientRoutes/paymentRoute.js';
import hotelRoutes from './routes/adminRoutes/hotelRoute.js';
import adminEventsRoutes from './routes/adminRoutes/calendarRoute.js';
import adminUserRoutes from './routes/adminRoutes/usersRoute.js';
import adminBookingRoutes from './routes/adminRoutes/bookingRoute.js';
import { credentials } from './middleware/credentials.js';
import { connectToDB, createRedisClient } from './config/db.js';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();
const port : string | number = process.env.PORT || 5000;
connectToDB();
createRedisClient();
const __filename : string = fileURLToPath(import.meta.url);

const app : express.Application = express();
const __dirname : string = path.dirname(__filename);
const rootFolder : string = path.resolve(__dirname, "../");
app.use("/uploads/users", express.static(path.join(rootFolder, 'uploads/users')));
app.use("/uploads/hotels", express.static(path.join(rootFolder, 'uploads/hotels')));

const whiteList = ["http://localhost:3000", "http://localhost:8000"]; // allowed domains
const corsOptions : cors.CorsOptions = {
  origin: (origin, callback) => {
    if(whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
}
app.use(credentials);
app.use(cors(corsOptions)); // using cors for making requests from the client (localhost:3000) to another different origin (localhost:8000)
app.use((req, res, next) => {
  if(req.originalUrl === "/api/client/webhook") {
    next();
  } else {
    express.json({ limit: '30mb' })(req, res, next); // parser for requests with the content type of json
    // next();
  }
});
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRoutes); // authentication routes(logging and registering)
app.use("/api/client", clientRoutes);
app.use("/api/client", paymentRoutes);

app.use("/admin/calendar", adminEventsRoutes); // admin routes
app.use("/admin/hotels", hotelRoutes); // admin routes
app.use("/admin/users", adminUserRoutes); // admin routes
app.use("/admin/bookings", adminBookingRoutes); // admin routes
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connected to backend server on port ${port}`);
});

