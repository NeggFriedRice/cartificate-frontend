import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { animationSlide } from '../utils/animation'
import { motion } from 'framer-motion'


const EditProfile = ({ getUser, user}) => {

  const nav = useNavigate()
  // Set input form to user's current vehicle information
  const [vehicle, setVehicle] = useState(user.vehicle)


  // Input change handler
  function changeHandler(event) {
    let { name, value } = event.target
    setVehicle({...vehicle,
      [name]: value})
  }

  // Update user vehicle in database
  async function updateVehicle(vehicle) {
    const response = await fetch(import.meta.env.VITE_BACKEND_API_URL+`/profile/${user._id}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(vehicle)
    })
  }
  
  // Submit form function
  async function submitHandler(event) {
    event.preventDefault()
    await updateVehicle(vehicle)
    await getUser()
    nav('/profile')
  }

  // Styling
  const inputFormat = 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 text-setPurpleLight lg:mb-4 mt-4'
  const headingFormat = 'block mb-2 mt-4 text-sm font-medium text-setPurpleDark text-[1.25rem] lg:text-[1.5rem]'

  return (
    <motion.div
    key="addEntry"
    initial={animationSlide.hidden}
    animate={animationSlide.visible}
    exit={animationSlide.exit}
    className="flex justify-center">
    <div className="flex w-[85%] justify-center bg-[#e6fffe] my-8 rounded-[15px] shadow-block-md hover:shadow-block-lg shadow-setPurpleDark hover:shadow-setPurpleDark transition-all duration-700">
      <form onSubmit={submitHandler} className="w-[100%] px-8">
        <div className="my-4">
        <h2 className="text-[2rem] text-setPurpleLight font-semibold">Edit vehicle details</h2>
          <h2 className={headingFormat}>Brand</h2>
          <input className={inputFormat} type="text" name="brand" placeholder="Honda, Toyota, Subaru" value={vehicle.brand} onChange={changeHandler}/>
          <h2 className={headingFormat}>Model</h2>
          <input className={inputFormat} type="text" name="model" placeholder="Civic, Corolla, Crosstrek" value={vehicle.model} onChange={changeHandler}/>
          <h2 className={headingFormat}>Year</h2>
          <input className={inputFormat} type="text" name="year" placeholder="2005" value={vehicle.year} onChange={changeHandler}/>
          <h2 className={headingFormat}>Registration</h2>
          <input className={inputFormat} type="text" name="registration" placeholder="CFE258" value={vehicle.registration} onChange={changeHandler}/>
          <h2 className={headingFormat}>VIN</h2>
          <input className={inputFormat} type="text" name="vin" placeholder="JHMAP1130YT000220" value={vehicle.vin} onChange={changeHandler}/>
        </div>
        <div className="flex flex-col my-4">
          <motion.div
          whileTap={{ scale: 0.9 }} 
          className="flex justify-center">
            <button className="flex w-[50%] justify-center rounded-md transition-all duration-700 bg-violet-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-600 mb-4 lg:text-[1.25rem] lg:py-3 shadow-block-sm hover:shadow-block-smmd shadow-gray-600 hover:shadow-gray-600  animate-floatxs">Submit</button>
          </motion.div>
        </div> 
      </form>
    </div> 
    </motion.div>
  )
}

export default EditProfile