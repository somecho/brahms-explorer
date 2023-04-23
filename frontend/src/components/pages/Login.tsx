import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "../LoginButton";

interface LoginProps {
	onLoginSuccess: (userData: { [key: string]: string | boolean }) => void;
}

const clientId = "14313480731-m64g2td2mbpaaemhq3vov4fjkcsf5btt.apps.googleusercontent.com"

const Login: FC<LoginProps> = ({ onLoginSuccess }) => {
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<Container>
				<Heading as="h3" my="1em">Login</Heading>
				<Text>
					If you're an admin, you can login to edit, add or delete pieces.
					To find out more about how to become an admin, please contact Somē.
				</Text>
				<LoginButton onLoginSuccess={onLoginSuccess}/>
			</Container>
		</GoogleOAuthProvider>
	)
}

export default Login;
