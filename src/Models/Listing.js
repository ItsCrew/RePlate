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
        enum: ['active', 'claimed', 'expired'],
        default: 'active'
    },

    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point'
        },
        coordinates: {
            type: [Number],
            required: true

        }
    }
})

ListingSchema.index({ location: '2dsphere' })

module.exports = mongoose.model("Listing", ListingSchema)