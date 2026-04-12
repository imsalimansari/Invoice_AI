import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({    
    id: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    unitPrice: {
        type: Number,
        required: true,
        default: 0
    }
},
{ _id : false }
);

// the schema for invoice
const InvoiceSchema = new mongoose.Schema({
    owner: {
        type: String,
        required: true,
        index: true
    },
    invoiceNumber: {
        type: String,
        required: true,
        index: true
    },
    issueDate: {   
        type: String,
        required: true
    },
    dueDate: {
        type: String,
        default: ""
    },

    // For Business Details

    fromBusinessName: { type: String, default: "" },
    fromEmail: { type: String, default: "" },
    fromAddress: { type: String, default: "" },
    fromPhone: { type: String, default: "" },
    fromGst: { type: String, default: "" },

    // For Client Details
    client: {
        name: { type: String, default: "" },
        email: { type: String, default: "" },
        address: { type: String, default: "" },
        phone: { type: String, default: "" },
    },

    items: { type: [ItemSchema], default: [] },
    

    currency: { type: String, default: "INR" },
    status: { type: String, enum: ["draft", "unpaid", "paid", "overdue"], default: "draft" },

    // For Assets Handling
    logoDataUrl: { type: String, default: null },
    stampDataUrl: { type: String, default: null },
    signatureDataUrl: { type: String, default: null },

    signatureName: { type: String, default: "" },
    signatureTitle: { type: String, default: "" },

    taxPercent: { type: Number, default: 18 },

    subtotal: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: { type: Number, default: 0 },
}, { timestamps: true }
);

const Invoice = mongoose.model.Invoice || mongoose.model("Invoice", InvoiceSchema);
export default Invoice;