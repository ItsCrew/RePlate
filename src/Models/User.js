const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true
    },

    password: {
        type: String
    },

    role: {
        type: String
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

UserSchema.index({ location: '2dsphere' })

module.exports = mongoose.model("User", UserSchema);