import { Link } from 'react-router-dom'


const NavBar = ({user, setUser}) => {

  async function logOut() {
    sessionStorage.clear()
    setUser(null)
  } 

  function getUser() {
    console.log(user)
  }

  return (
    <>
      <nav className="navbar w-[80vw] bg-teal-800 rounded-b-[25px]" role="navigation">
        <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <button className="bg-transparent">CARtificate</button>
            </Link>
            <Link to="/updates/new" className="navbar-item">
              <button className="bg-transparent">Add</button>
            </Link>
            {!user && <Link to="/login" className="navbar-item">
              <button className="bg-transparent">Login</button>
            </Link>}
            {user && <button type="button" onClick={logOut} className="text-white">Sign out</button>}
            <button type="button" onClick={getUser}>Get User details</button>
        </div>
      </nav>
    </>
  )
}

export default NavBar