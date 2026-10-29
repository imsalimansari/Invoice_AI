import mongoose from "mongoose";

// NOTE: the original code had this connection string hard-coded.
// It is kept as a fallback so the project keeps working, but you should move it
// to MONGODB_URI in backend/.env (and rotate the DB password, see README).
const FALLBACK_URI =
  "mongodb+srv://salimansari7644_db_user:InvoiceAI123@cluster0.gfcsfx9.mongodb.net/";

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI || FALLBACK_URI;
  await mongoose
    .connect(uri)
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => {
      console.log("MongoDB connection failed:", error.message);
    });
};
