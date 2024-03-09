import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    images: {
        type: [String],
        required: false,
    },
    // shortTitle: {
    //     type: String,
    //     required: true,
    // },
    // shortDesc: {
    //     type: String,
    //     required: true,
    // },
    // deliveryTimes: {
    //     type: Number,
    //     required: true,
    // },
    // revisionNumber: {
    //     type: Number,
    //     required: true,
    // },
    features: {
        type: [String],
        required: false,
        default: [],
    },
    totalStars: {
        type: Number,
        default: 0,
    },
    starNumber: {
        type: Number,
        default: 0,
    },
    sales: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

export default mongoose.model('Product', productSchema)