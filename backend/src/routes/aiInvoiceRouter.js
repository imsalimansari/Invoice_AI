import express from "express";
import { generateInvoice } from "../controllers/aiInvoiceController.js";

const aiInvoiceRouter = express.Router();

aiInvoiceRouter.post("/generate", generateInvoice);

export default aiInvoiceRouter;
