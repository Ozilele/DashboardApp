import express from 'express';
import pkg from 'gridfs-stream';
const { Grid } = pkg;
import * as dotenv from 'dotenv';
dotenv.config();
import pagesRoutes from './routes/pagesRoute.js';
import cors from "cors";
import path from 'path';
import authRoutes from './routes/auth.js';
import hotelRoutes from './routes/adminRoutes/hotelRoute.js'
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

// const storage = multer.diskStorage({
//   destination: function(req, file, cb) {
//     cb(null, './backend/uploads')
//   },
//   filename: (req, file, cb) => {
//     console.log(file);
//     cb(null, Date.now() + path.extname(file.originalname)); // replaced name
//   },
// });
// const upload = multer({ storage: storage });

// app.post("/upload", upload.single('image'), async (req, res) => {
//   console.log(req.file);
//   const { hotelName, hotelCountry, hotelCity, hotelAddress, stars, features_see, features_mountains, features_parking } = req.body;
//   const savedImg = {
//     name: req.file.originalname,
//     img: {
//       data: fs.readFileSync('./backend/uploads/' + req.file.filename),
//       contentType: "image/jpg",
//     }
//   }
//   const newHotel = await Hotel.create({
//     name: hotelName,
//     country: hotelCountry,
//     localization: {
//       city: hotelCity,
//       address: hotelAddress,
//     },
//     image: savedImg,
//     features: {
//       closeToSee: features_see ? true : false,
//       closeToMountains: features_mountains ? true : false,
//       hasParking: features_parking ? true : false,
//     },
//     stars: stars,
//   });
//   if(newHotel) {
//     return res.status(201).json({
//       message: "Successfully added new hotel"
//     });
//   } else {
//     return res.status(401).json({
//       message: "Error occurred :("
//     })
//   }
// });

// try {
//   const privateKey = fs.readFileSync("./private_key.pem", 'utf-8');
//   console.log("Git");
//   const publicKey = fs.readFileSync("./public_key.pem", 'utf-8');
//   console.log("Gut");
// } catch(err) {
//   console.log(err);
//   console.log(err.message);
// }

app.use('/auth', authRoutes);
app.use("/admin/calendar", adminEventsRoutes);
app.use("/admin/hotels", hotelRoutes);
app.use("/admin/users", adminUserRoutes);
app.use('/dashboard', pagesRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Connected to backend server on port ${port}`);
});

