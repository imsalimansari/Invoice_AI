import fs from "fs";
import path from "path";
import multer from "multer";
import { UPLOADS_DIR } from "../config/constants.js";

// make sure the uploads folder exists
fs.mkdirSync(UPLOADS_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `business-${unique}${ext}`);
  },
});

const upload = multer({ storage });

// business profile image fields
export const businessImagesUpload = upload.fields([
  { name: "logoName", maxCount: 1 },
  { name: "stampName", maxCount: 1 },
  { name: "signatureNameMeta", maxCount: 1 },
]);

export default upload;
