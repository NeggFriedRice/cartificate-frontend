import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Unauthorised from './Unauthorised'
import { motion } from 'framer-motion'
import { animationSlide } from '../utils/animation'


const SingleUpdate = ({ id, deleteUpdate, user }) => {

    const navigate = useNavigate()
    const [entry, setEntry] = useState("")
    const [userID, setUserID] = useState(false)

    // Date modifier to format ISO date format stored in database
    function dateMod(date) {
        return date.split('T')[0]
      }

    // Single update getter, using ID as criteria
    async function getSingleUpdate() {
        await fetch(import.meta.env.VITE_BACKEND_API_URL+`/updates/${id}`)
        .then(response => response.json())
        .then(data => setEntry(data))
    }

    // Security gateway - Check if selected update was created by logged in user
    function checkId() {
        try {
            if(user._id == entry.createdBy) {
                setUserID(true)
            }
        } catch (error) {
            return
        }
    }

    // Get single update on component mount
    useEffect(() => {
        getSingleUpdate()
    }, [])

    // When entry state changes, trigger security gateway to verify user is looking at their own entry
    useEffect(() => {
        checkId()
    }, [entry])

    // Delete function
    function deleteHandler() {
       deleteUpdate(id)
        navigate('/')
    }

    // Navigate to entry edit route
    function navToEdit() {
        navigate(`/updates/edit/${id}`)
    }

    return (
        <motion.div
        initial={animationSlide.hidden}
        animate={animationSlide.visible}
        exit={animationSlide.exit}>
            <div className="flex justify-center animate-floatxs">
                <ul className="py-8">
                    {userID ?
                    <li className="bg-setPeachLight w-[350px] rounded-r-[15px] rounded-bl-[15px] p-4 shadow-block-md hover:shadow-block-lg shadow-setPurpleDark hover:shadow-setPurpleDarkHover transition-all duration-700 lg:w-[700px] lg:py-6">
                        <div className="grid grid-cols-3 py-4">
                            <h3 className="text-[1.5rem] lg:text-[2rem] text-setPurpleDark col-span-2">{entry.activity}</h3>
                            <div className="flex flex-wrap">
                                <motion.div
                                whileTap={{ scale: 0.9 }}>
                                <button
                                type="button" 
                                className="bg-teal-500 hover:bg-teal-400 w-[65px] rounded-lg px-2 text-sm h-[30px] mx-4 my-1  transition-all duration-700" onClick={navToEdit}>
                                    Edit
                                </button>
                                </motion.div>
                                <motion.div
                                whileTap={{ scale: 0.9 }}>
                                <button type="button" className="bg-red-500 hover:bg-red-400 w-[65px] rounded-lg px-2 text-sm h-[30px] mx-4 my-1 transition-all duration-700" onClick={deleteHandler}>Delete</button>
                                </motion.div>
                            </div>
                        </div>
                        <div className="text-setPurpleDark py-4 text-[1.25rem] lg:text-[1.5rem]">
                            <h3>Cost: <span className="text-setPurpleLight">${entry.cost}</span></h3>
                            {entry && <h3>Date: <span className="text-setPurpleLight">{dateMod(entry.date)}</span></h3>}
                            <p>Notes:</p>
                            <p><span className="text-setPurpleLight">{entry.notes}</span></p>
                        </div>
                    </li> : <Unauthorised />}
                </ul>
            </div>
        </motion.div>
        )
}

export default SingleUpdate