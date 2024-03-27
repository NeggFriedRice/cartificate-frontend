import React from 'react'
import { motion } from 'framer-motion'
import { animationSlide } from './animation'
import { Link } from 'react-router-dom'

export default function HowToUse() {
  return (
    <motion.div
    initial={animationSlide.hidden}
    animate={animationSlide.visible}
    exit={animationSlide.exit}>
        <div className="flex justify-center animate-floatxs py-12 text-setPurpleDark text-[1.25rem] max-xs:text-[1rem]">
                <div className="bg-setPeach w-[350px] rounded-r-[15px] rounded-bl-[15px] p-4 shadow-block-md hover:shadow-block-lg shadow-setPurpleDark hover:shadow-setPurpleDark transition-all duration-700 lg:w-[700px] lg:py-6">
                <ul className="list-disc px-8 text-setPurpleDark">
                    <li>
                        <Link to="/register"><p className="underline">Register an account</p></Link>
                    </li>
                    <li>
                        <p>Click Add to create your first entry</p>
                    </li>
                    <li>
                        <p>Fill in the details!</p>
                    </li>
                    <li>
                        <p>Click submit!</p>
                    </li>
                </ul>
                <p className="py-8">You can go back and edit or delete any entries that you have submitted at any time, happy tracking ~</p>
                </div>
        </div>
    </motion.div>
  )
}
