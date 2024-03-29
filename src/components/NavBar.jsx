import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ExportToExcel from '../utils/ExportToExcel'


const NavBar = ({user, filtered }) => {

  const navbarFormat = "text-white px-4 lg:text-[1.5rem] lg:px-6 py-2 lg:py-4 bg-setPurpleDark rounded-[50px] mx-2"

  return (
    <motion.div
    key="navbar"
    style={{ position: 'relative'}}
    initial={{ y: '-130%', opacity: 0}}
    animate={{ y: 0, opacity: 1, transition: { delay: 0.5, duration: 0.5 }}}
    >
    <div className="flex justify-center">
      <nav className="w-[80vw] lg:w-[800px] lg:h-[55px] " role="navigation">
        <div className="justify-between py-2 px-4 text-sm relative">
          <div className="flex">
            <Link to="/">
              <motion.button className={navbarFormat}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9, opacity: 0.5, transition: { duration: 0.1 }}}
              animate={{ transition: { delay: 0, duration: 0.1 } }}>
                CARtificate
              </motion.button>
            </Link>
            <AnimatePresence>
            {user && 
            <motion.div
            key="add"
            initial={{opacity: 0, y:'-100%'}}
            animate={{opacity: 1, y: 0 }}
            transition={{ delay:0.5, duration: 0.3}}
            whileTap={{ scale: 0.9}}
            exit={{ opacity: 0, y:'-100%'}}>
            <Link to="/updates/new">
              <motion.button className={navbarFormat}
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9, opacity: 0.5, transition: { duration: 0.1 }}}
              animate={{ transition: { delay: 0, duration: 0.1 } }}>
                Add
              </motion.button>
            </Link>
            </motion.div>}
            </AnimatePresence>
          </div>
          <div className="flex">
          <AnimatePresence mode="wait">
            {!user && 
            <motion.div
            key="loginsignup"
            className="absolute right-[10px] top-[10px]"
            initial={{opacity: 0, y:'-110%'}}
            animate={{opacity: 1, y: 0, transition: {delay: 1, duration: 0.3}}}
            exit={{ opacity: 0, y: '-100%'}}
            >
              <Link to="/login">
                <motion.button 
                className={navbarFormat}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9, opacity: 0.5, transition: { duration: 0.1 }}}
                animate={{ transition: { delay: 0, duration: 0.1 } }}>
                  Login
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button  
                className={navbarFormat}
                whileHover={{ scale: 0.95 }}
                whileTap={{ scale: 0.9, opacity: 0.5, transition: { duration: 0.1 }}}
                animate={{ transition: { delay: 0, duration: 0.1 } }}>
                Sign up
                </motion.button>
              </Link>
            </motion.div>}
          </AnimatePresence>
            {/* <button type="button" onClick={getUser}>Get User details</button> */}
          </div>
          <AnimatePresence mode="wait">
            {user && 
            <motion.div
            key="signOut"
            className="absolute right-[20px] top-[8px]"
            initial={{opacity: 0, y:'-100%'}}
            animate={{opacity: 1, y: 0, transition: {delay: 0.5, duration: 0.3}}}
            exit={{ opacity: 0, y:'-100%', x: 0, transition: {delay: 0.5, duration: 0.3}}}>
              <div className="relative">
              <ExportToExcel excelData={filtered} />
              <Link to="/profile">
              <motion.button  
              className="text-white py-2 px-4 bg-slate-700 rounded-[50px] lg:text-[1.5rem] lg:px-6 lg:py-4"
              whileHover={{ scale: 0.95 }}
              whileTap={{ scale: 0.9, opacity: 0.5, transition: { duration: 0.1 }}}
              animate={{ transition: { delay: 0, duration: 0.1 } }}>
                {user.username}
              </motion.button>
              </Link>
              </div>
            </motion.div>}
            
          </AnimatePresence>
        </div>
      </nav>
      </div>
    </motion.div>
  )
}

export default NavBar