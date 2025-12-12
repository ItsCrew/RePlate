const mongoose = require('mongoose')

const ListingSchema = new mongoose.Schema({
    title: {
        type: String
    },

    description: {
        type: String
    },

    quantity: {
        type: Number
    },

    pickupWindow: {
        start: { type: Date, required: true },
        end: { type: Date, required: true }
    },

    status: {
        type: String,
        enum: ['active', 'claimed', 'expired']
    },

    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model("Listing", ListingSchema)