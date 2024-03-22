import { Link, useNavigate } from 'react-router-dom'


const NavBar = ({user, setUser, setIsLoggedIn, getUpdates}) => {

  const navigate = useNavigate()

  async function logOut() {
    sessionStorage.clear()
    setUser(null)
    setIsLoggedIn(false)
    getUpdates()
    navigate('/')
  } 

  function getUser() {
    console.log(user)
  }

  const navbarFormat = "text-white px-2 lg:text-[1.5rem] lg:px-6 lg:py-2 transition-all duration-300 hover:text-red-200 hover:scale-105"

  return (
    <>
    <div className="flex justify-center">
      <nav className="w-[80vw] lg:w-[800px] lg:h-[55px] bg-setPurpleLight rounded-b-[25px]" role="navigation">
        <div className="flex justify-between py-2 px-4 text-sm">
          <div className="flex">
            <Link to="/">
              <button className={navbarFormat}>CARtificate</button>
            </Link>
            {user && <Link to="/updates/new">
              <button className={navbarFormat}>Add</button>
            </Link>}
          </div>
          <div className="flex">
            {!user && <Link to="/login">
              <button  className={navbarFormat}>Login</button>
            </Link>}
            {user && <button type="button" onClick={logOut} className={navbarFormat}>Sign out</button>}
            {!user && <Link to="/register">
              <button  className={navbarFormat}>Sign up</button>
            </Link>}
            {/* <button type="button" onClick={getUser}>Get User details</button> */}
          </div>
        </div>
      </nav>
      </div>
    </>
  )
}

export default NavBar