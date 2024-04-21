require('dotenv').config()
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')

app.use(cors({
  origin:'http://localhost:5173'
}))
//middleware
app.use(express.json())
app.use((req,res,next)=>{
console.log(req.path,req.method)
next()
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/user',userRoutes)


//connect mongodb
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
  //listen for requests
  app.listen(process.env.PORT,()=>{
  console.log('listening on 4000')
  })
})
.catch((err)=>{
  console.log(err)
})



