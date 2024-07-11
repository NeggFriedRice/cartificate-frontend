import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function Intro(key) {
  const containerVariants = {
    hidden: {
      y: "-100%",
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { delay: 1.25, type: "spring", stiffness: 200 },
    },
    exit: {
      x: "-200%",
      opacity: 0,
      transition: { duration: 0.1 },
    },
  };

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/login">
          <div className="animate-float transition-all duration-700 flex justify-center py-8 mt-24 bg-setPeach hover:bg-setPeachLight rounded-full shadow-block-md hover:shadow-block-lg shadow-setPurpleDark hover:shadow-setPurpleDark">
            <p className="text-setPurpleDark lg:text-[1.5rem]">
              Get your maintenance started!
            </p>
            <span className="relative flex top-[1px] right-[12px] h-5 w-5 ">
              <img
                className="absolute w-[35px] lg:w-[35px] mx-4 animate-ping duration-1000 opacity-75"
                src="cursor.svg"
              />
              <img
                className="relative inline-flex w-[35px] lg:w-[35px]  mx-4 "
                src="cursor.svg"
              />
            </span>
          </div>
        </Link>
      </motion.div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            delay: 1.5,
            duration: 0.1,
            type: "spring",
            stiffness: 200,
          },
        }}
        exit="exit"
        whileTap={{ scale: 0.95 }}
      >
        <Link to="/info">
          <div className="animate-floatxs transition-all duration-700 flex justify-center py-4 mt-24 bg-[#D9EDBF] hover:bg-[#b9d98f] rounded-full shadow-block-sm hover:shadow-block-smmd shadow-setPurpleDark hover:shadow-setPurpleDark w-[250px]">
            <div className="w-64 flex justify-center">
              <p className="text-setPurpleDark lg:text-[1.25rem] ">
                Welcome!
              </p>
            </div>
          </div>
        </Link>
      </motion.div>
    </>
  );
}
