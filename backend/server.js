import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config();
import pagesRoutes from './routes/pagesRoute.js';
// import appRoutes from "./routes/appRoute.js";
import cors from "cors";
import authRoutes from './routes/auth.js';
import adminEventsRoutes from './routes/adminRoutes/calendarRoute.js';
// import usersRoutes from "./routes/usersRoute.js";
import { connectToDB } from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
const port = process.env.PORT || 5000;

connectToDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use('/auth', authRoutes);

app.use("/admin/calendar", adminEventsRoutes);
app.use('/dashboard', pagesRoutes);
// app.use('/users', usersRoutes);
// app.use('/app', appRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connected to backend server on port ${port}`);
});

