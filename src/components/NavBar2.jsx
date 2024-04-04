import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import ExportToExcel from '../utils/ExportToExcel'


const NavBar2 = ({user, filtered }) => {

  const navbarFormat = "text-white lg:text-[1.5rem] bg-setPurpleDark rounded-[50px] lg:mx-2 mx-1 relative"
  const navLabelFormat = "px-6 py-4 max-lg:px-4 max-lg:py-2"

  // Framer-motion settings
  const textShow = { opacity: 1, transition: { delay: 0.75, duration: 0.5 } }
  const hideOriginR = { x: 150, y: -100, height: 0, width: 0, opacity: 0 }
  const hideOriginL = { x: -150, y: -100, height: 0, width: 0, opacity: 0 }
  const elShow = { x: 0, y: 0, height: "auto", width: "auto", opacity: 1}
  const transition = { delay: 0.5, duration: 1, type: 'spring', stiffness: 150, damping: 15, ease: 'easeInOut' }
  const exit = { y: 100, opacity: 0}
  const whileTap = { scale: 0.9, opacity: 0.5, transition: { delay: 0, duration: 0.1 }}

  return (
    <div
    key="navbar"
    style={{ position: 'relative'}}
    className="mt-2"
    >
    <div className="flex justify-center">
      <nav className="w-[80vw] max-xs:w-[100vw] lg:w-[800px] lg:h-[55px]" role="navigation">
        <div className="justify-between text-sm relative">
          <div className="flex">
            <Link to="/">
              <motion.button className={navbarFormat}
              whileHover={{ scale: 0.95 }}
              whileTap={whileTap}
              initial={hideOriginR}
              animate={elShow}
              transition={transition}
              exit={exit}>
                <div className={navLabelFormat}>
                  <motion.p
                  initial={{ opacity: 0 }}
                  animate={textShow}>
                    CARtificate
                  </motion.p>
                </div>
                <motion.p 
                initial={{ opacity: 0, x: 350 }}
                animate={{ opacity: [0, 1, 1, 0], x: 0, transition: { delay: 1.5, duration: 2, ease: "easeInOut" }}}
                className="absolute z-1 top-[30px] right-[110px] max-lg:top-[21px] text-[26px]">🚗
                </motion.p>
              </motion.button>
            </Link>
            <AnimatePresence>
            {user && 
            <div key="add">
              <Link to="/updates/new">
                <motion.button className={navbarFormat}
                whileHover={{ scale: 0.95 }}
                whileTap={whileTap}
                initial={hideOriginR}
                animate={elShow}
                transition={transition}
                exit={exit}>
                  <div className={navLabelFormat}>
                    <motion.p
                    initial={{ opacity: 0 }}
                    animate={textShow}>
                      Add
                    </motion.p>
                  </div>
                </motion.button>
              </Link>
            </div>}
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {/* Show login/sign up buttons if user state is null */}
            {!user && 
            <div className="flex"
            key="loginsignup">
            <motion.div
            className="absolute right-[10px] top-[0px]"
            >
              <Link to="/login">
                <motion.button 
                className={navbarFormat}
                whileHover={{ scale: 0.95 }}
                whileTap={whileTap}
                initial={hideOriginL}
                animate={elShow}
                transition={transition}
                exit={exit}>
                  <div className={navLabelFormat}>
                    <motion.p
                    initial={{ opacity: 0 }}
                    animate={textShow}
                    >Login
                    </motion.p>
                  </div>
                </motion.button>
              </Link>
              <Link to="/register">
                <motion.button  
                className={navbarFormat}
                whileHover={{ scale: 0.95 }}
                whileTap={whileTap}
                initial={hideOriginL}
                animate={elShow}
                transition={transition}
                exit={exit}>
                  <div className={navLabelFormat}>
                    <motion.p
                    initial={{ opacity: 0 }}
                    animate={textShow}
                    >Register
                    </motion.p>
                  </div>
                </motion.button>
              </Link>
            </motion.div>
          </div>}
          {/* Show username if user state exists */}
            {user && 
            <motion.div
            key="profile"
            className="absolute right-[20px] top-[0px]">
              <div className="flex">
                <ExportToExcel excelData={filtered} />
                <Link to="/profile">
                  <motion.button  
                  className="text-white bg-slate-700 rounded-[50px] lg:text-[1.5rem]"
                  whileHover={{ scale: 0.95 }}
                  whileTap={whileTap}
                  initial={hideOriginL}
                  animate={elShow}
                  transition={transition}
                  exit={exit}>
                    <div className="py-2 px-4 lg:px-6 lg:py-4">
                      <motion.p
                      initial={{ opacity: 0 }}
                      animate={textShow}
                      >{user.username}</motion.p>
                    </div>
                  </motion.button>
                </Link>
              </div>
            </motion.div>}
            
          </AnimatePresence>
        </div>
      </nav>
      </div>
    </div>
  )
}

export default NavBar2