import { Button, Container, Heading, Text } from "@chakra-ui/react";
import { FC } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import LoginButton from "../LoginButton";

interface LoginProps {
}

const Login: FC<LoginProps> = () => {
	return (
		<Container>
			<Heading as="h3" my="1em">Login</Heading>
			<Text>
				If you're an admin, you can login to edit, add or delete pieces.
				To find out more about how to become an admin, please contact Somē.
			</Text>
			<LoginButton />
		</Container>
	)
}

export default Login;
