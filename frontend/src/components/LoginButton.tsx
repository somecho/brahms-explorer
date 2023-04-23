import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { FC } from "react"

interface LoginButtonProps {
	onLoginSuccess: (userData: { [key: string]: string | boolean }) => void;
}

const LoginButton: FC<LoginButtonProps> = ({ onLoginSuccess }) => {
	const googleLogin = useGoogleLogin({
		onSuccess: async codeResponse => {
			const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: { Authorization: `Bearer ${codeResponse.access_token}` }
			})
			const data = await userInfo.json();
			onLoginSuccess(data);
			document.cookie = `access_token=${codeResponse.access_token}`
		},
	})
	return <Button onClick={() => googleLogin()}>Login</Button>
}

export default LoginButton;
