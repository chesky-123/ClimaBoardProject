import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router"

export default function Login() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState("")
  const SearchRef = useRef('')
  const handelClick = () => {
    localStorage.setItem("userName", userName),
      navigate("/Home")
  }

  useEffect(() => {
    SearchRef.current.focus()
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
      <button onClick={() => handelClick()}>Sign in</button>
    </div>
  )
}

