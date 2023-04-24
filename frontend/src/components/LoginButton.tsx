import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FC } from "react"
import { setCookie } from "react-use-cookie";

interface LoginButtonProps {
}

const LoginButton: FC<LoginButtonProps> = () => {
	const navigate = useNavigate();

	const googleLogin = useGoogleLogin({
		onSuccess: async response => {
			const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: { Authorization: `Bearer ${response.access_token}` }
			})
			const data = await userInfo.json();
			setCookie('access_token', response.access_token, {
				days: 1
			})
			setCookie('currentUser', data.name, {
				days: 1
			})
			navigate("/")
			window.location.reload()
		},
	})
	return <Button
		my="2em"
		colorScheme="messenger"
		onClick={() => googleLogin()}>Login with Google</Button>
}

export default LoginButton;
