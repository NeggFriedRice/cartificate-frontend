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

  return (
    <>
    <div className="flex justify-center">
      <nav className="w-[80vw] bg-teal-800 rounded-b-[25px]" role="navigation">
        <div className="flex justify-between py-2 px-4 text-sm">
          <div className="flex">
            <Link to="/">
              <button className="text-white px-2 ">CARtificate</button>
            </Link>
            {user && <Link to="/updates/new">
              <button className="text-white px-2">Add</button>
            </Link>}
          </div>
          <div className="flex">
            {!user && <Link to="/login">
              <button  className="text-white px-2">Login</button>
            </Link>}
            {user && <button type="button" onClick={logOut} className="text-white px-2">Sign out</button>}
            {!user && <Link to="/register">
              <button  className="text-white px-2">Sign up</button>
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