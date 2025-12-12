const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    claimedAt: {
        type: Date,
        default: Date.now
    },

    claimCode: {
        type: String
    }
})