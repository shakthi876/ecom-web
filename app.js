require('dotenv').config()
const express= require('express')
const app = express()
const mongoose= require('mongoose')
const cors = require("cors");
const cookieParser= require('cookie-parser')
const path = require('path')
const PORT = process.env.PORT || 8000

//Database connectivity
mongoose.connect(process.env.dataBase,{useNewUrlParser: true})
.then(()=>console.log('Database is connected successfully!!!'))
.catch((err)=> console.log('Error is',err))

//middle wares
app.use(cors());
app.use(cookieParser())
app.use(express.json());

//routers
const auth = require("./routes/auth")
const userRoutes = require("./routes/user")
const categoryRoutes = require("./routes/category")
const productRoutes = require("./routes/product")
const orderRoutes = require("./routes/order")


const paymentBrain = require("./routes/paymentBrain")

//routers middleware
app.use("/api",auth)
app.use("/api",userRoutes)
app.use("/api",categoryRoutes)
app.use("/api",productRoutes)
app.use("/api",orderRoutes)


app.use("/api",paymentBrain)

if (process.env.NODE_ENV === 'production') {
    //*Set static folder up in production
    app.use(express.static('client/build'));

    app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'client', 'build','index.html')));
  }

app.listen(PORT,()=>console.log(`App is running in ${PORT} successfully!!!`))
    
