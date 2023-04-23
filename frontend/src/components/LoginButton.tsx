import { Button } from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FC } from "react"

interface LoginButtonProps {
	onLoginSuccess: (userData: { [key: string]: string | boolean }) => void;
}

const LoginButton: FC<LoginButtonProps> = ({ onLoginSuccess }) => {
	const navigate = useNavigate();

	const googleLogin = useGoogleLogin({
		onSuccess: async codeResponse => {
			const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: { Authorization: `Bearer ${codeResponse.access_token}` }
			})
			const data = await userInfo.json();
			onLoginSuccess(data);
			document.cookie = `access_token=${codeResponse.access_token}`
			navigate("/")
		},
	})
	return <Button
		my="2em"
		colorScheme="messenger"
		onClick={() => googleLogin()}>Login with Google</Button>
}

export default LoginButton;
