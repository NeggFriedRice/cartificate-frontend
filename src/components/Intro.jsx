import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Intro(key) {

  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: { delay: 1.5, duration: 1.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 1 }
    }
  }

  return (
    <motion.div
    variants={containerVariants}
    initial="hidden"
    animate="visible"
    exit="exit">
    <Link to="/login">
        <div className="animate-float transition-all flex justify-center py-8 mt-24 bg-setPeach hover:bg-setPeachLight rounded-full shadow-block-md hover:shadow-block-lg shadow-setPurpleDark hover:shadow-setPurpleDark">
            <p className="text-setPurpleDark lg:text-[1.5rem]">Get your maintenance started!</p>
            <span className="relative flex top-[1px] right-[12px] h-5 w-5 ">
            <img className="absolute w-[20px] lg:w-[25px] mx-4 animate-ping duration-1000 opacity-75" src="pointer.svg" />
            <img className="relative inline-flex w-[20px] lg:w-[25px] mx-4 " src="pointer.svg" />
            </span>
        </div>
    </Link>
    </motion.div>
  )
}
