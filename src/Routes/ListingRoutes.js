const express = require('express')
const router = express.Router()

const { GetAllListings, CreateListing, ClaimFood } = require('../Controllers/ListingControllers')

router.get('/', GetAllListings)

router.post('/', CreateListing)

router.post('/claim', ClaimFood)

module.exports = router;
