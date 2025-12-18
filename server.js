require('dotenv').config()
const express = require('express')
const http = require('http')
const path = require('path')
const { Server } = require('socket.io')
const ConnectDB = require('./src/Config/Connect')
const listingRoutes = require('./src/Routes/ListingRoutes');
const PORT = process.env.PORT || 3000
const authRouter = require('./src/Routes/AuthRoutes');
const cors = require('cors')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())
const server = http.createServer(app)
const io = new Server(server)
app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(express.json())

io.on('connection', (socket) => {
    console.log("A user has logged in!", socket.id);

    socket.on('disconnect', () => {
        console.log("The user has logged out!", socket.id);
    })
})


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/listings', listingRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './public', 'index.html'));
});

const start = async () => {
    try {
        await ConnectDB(process.env.PREV_MONGO_URI)
        console.log('Connected to the database succesfully!');
    } catch (error) {
        console.log(error)
    }
}

start()

module.exports = app