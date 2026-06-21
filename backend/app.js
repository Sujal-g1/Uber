const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const cors = require('cors')
const app = express()
const cookierParser = require('cookie-parser')
const connectDb = require('./db/db')

const userRoutes = require('./routes/userRoutes')
const captainRoutes = require('./routes/captainRoutes')

connectDb();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookierParser())


app.get('/',(req,res) => {
    res.send("server running")
})

app.use('/users', userRoutes)
app.use('/captains', captainRoutes)


module.exports = app 