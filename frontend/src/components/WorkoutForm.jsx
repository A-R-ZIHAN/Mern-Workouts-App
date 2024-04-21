import {useState} from 'react'
import {useWorkoutsContext} from '../hooks/useWorkoutsContext'
import { useAuthContext } from '../hooks/useAuthContext'
const WorkoutForm = ()=>{
  const {dispatch} = useWorkoutsContext()
  const {user} = useAuthContext()
  const [title,setTitle] = useState('')
  const [load,setLoad] = useState('')
  const [reps,setReps] = useState('')
  const [error,setError] = useState(null)
  const handleSubmit = async(e)=>{
    const workout = {title,load,reps}
      e.preventDefault()
      if(!user){
        setError('You must be logged in')
        return
      }

      const response = await fetch('http://localhost:4000/api/workouts',{
        method:"POST",
        body: JSON.stringify(workout),
        headers: {
          'Content-type':'application/json',
          'Authorization':`Bearer ${user.token}`
      }
      })
      
      const json = await response.json()
      if(!response.ok){
        setError(json.error)
      } 
      if(response.ok){
        setTitle('')
        setReps('')
        setLoad('')
        setError(null)
        console.log('New workout added',json)
        dispatch({type:'CREATE_WORKOUT',payload:json})
      }
      
    }
  return(
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title:</label>
      <input 
      type="text"
      onChange={(e)=>{
        setTitle(e.target.value)
      }}
      value={title}
      />

    <label>Load (in kg):</label>
      <input 
      type="text"
      onChange={(e)=>{
        setLoad(e.target.value)
      }}
      value={load}
      />


    <label>Reps:</label>
      <input 
      type="text"
      onChange={(e)=>{
        setReps(e.target.value)
      }}
      value={reps}
      />
    {error && <div className='error'>{error}</div>}
    <button>Add Workout</button>
    </form>

  )


}

export default WorkoutForm