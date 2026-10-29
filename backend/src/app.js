import express from "express";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { CLIENT_URL, UPLOADS_DIR } from "./config/constants.js";
import invoiceRouter from "./routes/invoiceRouter.js";
import aiInvoiceRouter from "./routes/aiInvoiceRouter.js";
import businessProfileRouter from "./routes/businessProfileRouter.js";

const app = express();

// Middleware
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));
app.use(clerkMiddleware());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true, limit: "20mb" }));

// Static files (uploaded logos / stamps / signatures)
app.use("/uploads", express.static(UPLOADS_DIR));

// Routes
// FIX: the frontend calls both /api/invoice (singular) and /api/invoices (plural),
// but the original server only mounted the plural one, so most calls returned 404.
app.use("/api/invoices", invoiceRouter);
app.use("/api/invoice", invoiceRouter);
app.use("/api/businessProfile", businessProfileRouter);
app.use("/api/ai", aiInvoiceRouter);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export default app;
