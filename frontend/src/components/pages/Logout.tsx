import { setCookie } from "react-use-cookie"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
const Logout = () => {
	const navigate = useNavigate()
	setCookie('currentUser', "", { days: 0 })
	setCookie('access_token', "", { days: 0 })
	useEffect(() => {
		window.location.reload()
		navigate("/")
	}, [])
	return <div>Logout page</div>
}

export default Logout
