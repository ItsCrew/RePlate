const express = require('express')
const router = express.Router()
const authenticateUser = require('../Middleware/Auth');

const { GetAllListings, CreateListing, ClaimFood } = require('../Controllers/ListingControllers')

router.get('/', GetAllListings)

router.post('/', authenticateUser, CreateListing)

router.post('/claim', authenticateUser, ClaimFood)

module.exports = router;
