import { motion } from 'framer-motion'
import { animationSlide } from '../utils/animation'
import { Link } from 'react-router-dom'


export default function HowToUse() {
  return (
    <motion.div
    initial={animationSlide.hidden}
    animate={animationSlide.visible}
    exit={animationSlide.exit}>
        <div className="flex justify-center animate-floatxs py-12 text-setPurpleDark text-[1.25rem] max-xs:text-[1rem]">
                <div className="bg-setPeach w-[350px] rounded-r-[15px] rounded-bl-[15px] p-4 shadow-block-md hover:shadow-block-lg shadow-setPurpleDark hover:shadow-setPurpleDark transition-all duration-700 lg:w-[700px] lg:py-6">
                    <p className="text-[1.5rem] font-bold py-4">Welcome to CARtificate, the easiest vehicle maintenance tracker you'll ever use!</p>
                <ul className="list-disc px-8 text-setPurpleDark">
                    <li>
                        <Link to="/register"><p className="underline">Register an account</p></Link>
                    </li>
                    <li>
                        <p>Sign into your new account</p>
                    </li>
                    <li>
                        <p>Click Add to create your first entry</p>
                    </li>
                    <li>
                        <p>Fill in the details</p>
                    </li>
                    <li>
                        <p>Click submit!</p>
                    </li>
                    <li>
                        <p>You also have the option of adding your vehicle details in your profile in the top right hand corner</p>
                    </li>
                </ul>
                <p className="py-8">Feel free to edit and delete entries as you see fit, happy tracking!</p>
                </div>
        </div>
    </motion.div>
  )
}
