import multer from "multer";
import path from 'path'

export const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './backend/uploads')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // replaced name
  },
});
