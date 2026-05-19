import { Link } from 'react-router'
import logoImg from '../assets/logo.png';
function Navbar({ user, setUser }) {
  function logOut() {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <div className='navbar'>

      <a href="/" className="nav-logo">
        <img src={logoImg} alt="Build Forge Logo" />
      </a>

      
      {/* Routes seen by everyone */}
      <Link className='nav-item' to='/'>Homepage</Link>

      {user ? (
        // Links for protected routes only for logged in users
        <>
          <Link className='nav-item' to='/dashboard'>Dashboard</Link>
          <Link className='nav-item' to='/builds/create'>Create Build</Link>

          <span className='nav-item'>What will you build {user.username}?</span>

          <button className='nav-item' onClick={logOut}>Log Out</button>
        </>
      ) : (
        // links for not logged in users
        <>
          <Link className='nav-item' to='/sign-up'>Sign up</Link>
          <Link className='nav-item' to='/sign-in'>Sign in</Link>
        </>
      )}
    </div>
  )
}

export default Navbar