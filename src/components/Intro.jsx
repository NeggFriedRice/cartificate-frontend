import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Intro(key) {

  const containerVariants = {
    hidden: {
      y: '-100%',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 2, type: 'spring', stiffness: '200' }
    },
    exit: {
      x: '-200%',
      opacity: 0,
      transition: { duration: 0.1 }
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
