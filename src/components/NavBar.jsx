import { Link } from 'react-router-dom'

const NavBar = () => {
  return (
    <>
      <nav className="navbar w-[40vw] bg-teal-800 rounded-b-[25px]" role="navigation">
        <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <p>CARtificate</p>
            </Link>
            <Link to="/updates/new" className="navbar-item">
              <p>Add</p>
            </Link>
            <Link to="/login" className="navbar-item">
              <p>Login</p>
            </Link>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">

          
        </div>
      </nav>
    </>
  )
}

export default NavBar