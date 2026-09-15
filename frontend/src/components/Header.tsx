import { useContext } from 'react'
import { useNavigate, Link } from 'react-router' 
import { UserContext } from '../contenx/UserContext'

export default function Header() {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);

  const handleLogout = () => {
    userContext?.logout(); 
    navigate("/login");
  }

  return (
    <header>
      <h1>ClimaBoard</h1>
      {userContext?.userName ? (
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <span>Hello, {userContext.userName} | </span>
          
          <Link to="/Home">Home</Link>
          <Link to="/compare">Compare Cities</Link>
          
          <button onClick={handleLogout} style={{ marginLeft: '20px' }}>Logout</button>
        </div>
      ) : null}
      <hr />
    </header>
  )
}