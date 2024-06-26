import { Link } from 'react-router-dom'
import Intro from './Intro'
import { motion } from 'framer-motion'
import { animationSlide } from '../utils/animation'
import HowToUse from './HowToUse'
import { useEffect } from 'react'


const ShowUpdate = ({ filtered, user, getUpdates }) => {

  useEffect(() => {
    getUpdates()
  }, [])

  // Date modifier to format ISO date format stored in database
  function dateMod(date) {
    return date.split('T')[0]
  }

  return (
    <>
    <div className="flex justify-center">
      <div className="w-[350px] lg:w-[750px] text-md p-4">
          <ul>
            {/* Check if any entries are coming through, or if entries list is empty */}
            {!filtered || filtered.length == 0 ?
              <>
              {/* If no entries, or empty entries list, and not logged in, show Intro component; else, if no entries, or empty entries list and user is logged in, show HowToUse component */}
              {!user ? <Intro/> : <HowToUse />}
              </>
            :
            filtered.map((update, index) => 
            <motion.div
            key={index}
            initial={animationSlide.hidden}
            animate={animationSlide.visible}
            exit={animationSlide.exit}
            whileTap={{ scale: 0.9 }}>
              <div className="animate-floatxs">
                <Link to={`updates/${update._id}`}>
                  <li className="py-3">
                    <div className="bg-setPeach hover:bg-setPeachLight p-2 rounded-r-[15px] rounded-bl-[15px] text-setPurpleDark shadow-block-smmd hover:shadow-block-md shadow-setPurpleDark hover:shadow-setPurpleDarkHover transition-all duration-700 lg:w-[700px] lg:py-6">
                        <div className="grid grid-cols-3 mx-2">
                          <h3 className="text-lg lg:text-[1.5rem] col-span-2">{index + 1}. {update.activity}</h3>
                          <h3 className="ml-auto lg:text-[1.5rem]">${update.cost}</h3>
                        </div>
                      <p className="px-2 text-setPurpleLight text-sm lg:text-[1rem]">{dateMod(update.date)}</p>
                    </div>
                  </li>
                </Link>
              </div>
            </motion.div>)
              }
          </ul>
      </div>
    </div>
    </>
    
  )
}

export default ShowUpdate