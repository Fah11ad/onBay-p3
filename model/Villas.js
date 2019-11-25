const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const villaSchema = mongoose.Schema({
    name:
    {
        type: String
        // required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    city: {
        type: String
    },
    price: { type: Number },
    description: { type: String },
    guests: { type: String },
    image: { type: String },
    ratings: [{
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        ratevalue: Number
    }],
    reviews: [{
        customer: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        reviewtext: String
    }],
    // rateNum:{type:Number},
    // ratingSum:{type:Number},
    x: { type: String },
    y: { type: String },
    facilities: { type: String },
    area: { type: String }


}, { timestamps: true })

module.exports = mongoose.model('Villas', villaSchema)