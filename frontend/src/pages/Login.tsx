import { useEffect, useRef, useState, useContext } from "react"
import { useNavigate } from "react-router"
import { UserContext } from "../contenx/UserContext"

export default function Login() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const SearchRef = useRef<HTMLInputElement>(null)
  
  const userContext = useContext(UserContext)

  const handelClick = () => {
    if (userName) {
      userContext?.login(userName); 
      navigate("/Home");
    }
  }

  useEffect(() => {
    SearchRef.current?.focus()
  }, [])

  return (
    <div>
      <input
        onChange={(e) => setUserName(e.target.value)}
        placeholder="Choose your nickname..."
        type="text"
        id="sign-in"
        value={userName}
        ref={SearchRef}
      />
      <button onClick={handelClick}>Sign in</button>
    </div>
  )
}