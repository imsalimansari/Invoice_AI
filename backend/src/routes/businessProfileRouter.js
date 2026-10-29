import express from "express";
import { businessImagesUpload } from "../middleware/upload.js";
import {
  createBusinessProfile,
  updateBusinessProfile,
  getMyBusinessProfile,
} from "../controllers/businessProfileController.js";

const businessProfileRouter = express.Router();

// create
businessProfileRouter.post("/", businessImagesUpload, createBusinessProfile);

// update
businessProfileRouter.put("/:id", businessImagesUpload, updateBusinessProfile);

// get my profile
businessProfileRouter.get("/me", getMyBusinessProfile);

export default businessProfileRouter;
