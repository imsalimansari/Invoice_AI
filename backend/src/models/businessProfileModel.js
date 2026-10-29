import mongoose from 'mongoose';

const businessProfileSchema = new mongoose.Schema({
    owner: { type: String, required: true, index: true },
    businessName: { type: String, required: true },
    email: { type: String, required: false, trim: true, lowercase: true, default: '' },
    address: { type: String, required: false, default: '' },
    phone: { type: String, required: false, default: '' },
    gst: { type: String, required: false, default: '' },

    //for image
    logoUrl: { type: String, required: false, default: null },
    stampUrl: { type: String, required: false, default: null },
    signatureUrl: { type: String, required: false, default: null },

    // for gst
    signatureOwnerName: { type: String, required: false, default: '' },
    signatureOwnerTitle: { type: String, required: false, default: '' },

    // FIX: renamed from defaultTaxPercentage -> defaultTaxPercent (the name the
    // controller and the frontend actually send/read), otherwise it was never saved.
    defaultTaxPercent: { type: Number, required: false, default: 18 },


}, { timestamps: true });

// FIX: mongoose.models (plural) is the registry; mongoose.model.X was always undefined
const BusinessProfile = mongoose.models.BusinessProfile || mongoose.model('BusinessProfile', businessProfileSchema);

export default BusinessProfile;
