const User = require('../Models/User')
const Listing = require('../Models/Listing')
const Transaction = require('../Models/Transaction')

const GetAllListings = async (req, res) => {
    try {
        const Listings = await Listing.find({ status: 'active' })
        res.status(200).json({ Listings })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const CreateListing = async (req, res) => {
    try {
        const { title, description, quantity, pickupWindow } = req.body
        const Listings = await Listing.create({ title, description, quantity, pickupWindow })
        res.status(201).json({ Listings })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

const ClaimFood = async (req, res) => {
    try {
        const { ListingID } = req.body
        const Listings = await Listing.findOneAndUpdate(
            { _id: ListingID, quantity: { $gt: 0 } },
            { $inc: { quantity: -1 } },
            { new: true }
        )
        if (!Listings) {
            res.status(400).json({ msg: 'Item Unavailable or Already Claimed!' })
        } else {
            const generatedCode = Math.random().toString(36).substring(7);
            await Transaction.create({ listing: ListingID, claimedAt: new Date(), claimCode: generatedCode })
            req.io.emit('update-foodcount', { ListingID: ListingID, newQuantity: Listings.quantity })
            res.status(200).json({ msg: `Claimed Successfully with the order id - ${generatedCode} ` })

        }
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    GetAllListings,
    CreateListing,
    ClaimFood
}