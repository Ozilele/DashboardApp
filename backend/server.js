import express from 'express';
import pkg from 'gridfs-stream';
const { Grid } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import path from 'path';
import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/adminRoutes/hotelRoute.js';
import clientRoutes from './routes/clientRoutes/clientRoute.js';
import clientPaymentRoutes from './routes/clientRoutes/paymentRoute.js';
import adminEventsRoutes from './routes/adminRoutes/calendarRoute.js';
import { connectToDB } from './config/db.js';
import adminUserRoutes from './routes/adminRoutes/usersRoutes.js';
import { fileURLToPath } from 'url';
import { errorHandler } from './middleware/errorMiddleware.js';

const port = process.env.PORT || 5000;
await connectToDB();

const __filename = fileURLToPath(import.meta.url);

const app = express();
app.use("/uploads/users", express.static(path.dirname(__filename) + '/uploads/users'));
app.use("/uploads/hotels", express.static(path.dirname(__filename) + '/uploads/hotels'));
app.use(cors()); // using cors for making requests from the client (localhost:3000) to another different origin (localhost:8000)
app.use(express.json({ limit: '30mb' })); // parser for requests with the content type of json
app.use(express.urlencoded({ extended: false}));

app.use('/auth', authRoutes); // authentication routes(logging and registering)
app.use("/api/client", clientRoutes);
app.use("/api/client", clientPaymentRoutes);

app.use("/admin/calendar", adminEventsRoutes); // admin routes
app.use("/admin/hotels", hotelRoutes); // admin routes
app.use("/admin/users", adminUserRoutes); // admin routes
app.use(errorHandler);

// app.use('/dashboard', pagesRoutes);

app.listen(port, () => {
  console.log(`Connected to backend server on port ${port}`);
});

