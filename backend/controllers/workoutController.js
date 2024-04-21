const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
//get workout
const getWorkouts = async(req,res) =>{
  const user_id = req.user._id
  const workout = await Workout.find({user_id}).sort({createdAt:-1})
  res.status(200).json(workout)
}

//get a single workout
const getWorkout = async(req,res) =>{
  const {id} = req.params
  const workout = await Workout.findById(id)
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No search workout"})
  }

  if(!workout){
    return res.status(400).json({error:"No search workout"})
  }
  res.status(200).json(workout)
}

//post workout
const createWorkout = async (req,res) =>{
  const {title, load, reps} = req.body
  const user_id = req.user._id
  try{
    const workout = await Workout.create({title,load,reps,user_id})
    res.status(200).json(workout)
  }catch(err){
    res.status(400).json({error:err.message})
  } 
}

//delete workout
const deleteWorkout = async(req,res)=>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No search workout"})
  }

  const workout = await Workout.findByIdAndDelete({_id:id})
  if(!workout){
    return res.status(400).json({error:"No search workout"})
  }

  res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req,res) =>{
  const {id} = req.params
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error:"No search workout"})
  }

  const workout = await Workout.findByIdAndUpdate({_id:id},
      {...req.body}  
    )
  if(!workout){
      return res.status(400).json({error:"No search workout"})
    }
  res.status(200).json(workout)
}

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
}