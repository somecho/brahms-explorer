import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";

interface LoginProps {

}

const clientId = "14313480731-m64g2td2mbpaaemhq3vov4fjkcsf5btt.apps.googleusercontent.com"

const LoginButton = () => {
	const googleLogin = useGoogleLogin({
		onSuccess: async codeResponse => {
			const userInfo = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
				headers: { Authorization: `Bearer ${codeResponse.access_token}` }
			})
			const data = await userInfo.json();
			console.log(data)
			document.cookie = `access_token=${codeResponse.access_token}`
		},
	})
	return <Button onClick={() => googleLogin()}>Login</Button>
}

const Login: FC<LoginProps> = () => {

	return (
		<GoogleOAuthProvider clientId={clientId}>
			<Container>
				<Heading as="h3" my="1em">Login</Heading>
				<Text>
					If you're an admin, you can login to edit, add or delete pieces.
					To find out more about how to become an admin, please contact Somē.
				</Text>
				<LoginButton />
			</Container>
		</GoogleOAuthProvider>
	)
}

export default Login;
