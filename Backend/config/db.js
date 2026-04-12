import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://salimansari7644_db_user:InvoiceAI123@cluster0.gfcsfx9.mongodb.net/InvoiceAI')
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection failed:", error.message);
    });
}
