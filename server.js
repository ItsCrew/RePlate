require('dotenv').config()
const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')
const ConnectDB = require('./src/Config/Connect')
const listingRoutes = require('./src/Routes/ListingRoutes');
const PORT = process.env.PORT || 3000

const app = express()
const server = http.createServer(app)
const io = new Server(server)
app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

io.on('connection', (socket) => {
    console.log("A user has logged in!", socket.id);

    socket.on('disconnect', () => {
        console.log("The user has logged out!", socket.id);
    })
})



app.use('/api/v1/listings', listingRoutes);

const start = async () => {
    try {
        await ConnectDB(process.env.PREV_MONGO_URI)
        console.log('Connected to the database succesfully!');
        server.listen(PORT, () => {
            console.log(`RePlate Server running on http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()

