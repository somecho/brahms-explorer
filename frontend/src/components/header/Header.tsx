import { FC } from "react"
import { Box } from "@chakra-ui/react";
import Title from "./Title";
import Subtitle from "./Subtitle";


interface HeaderProps { }

const Header: FC<HeaderProps> = () =>
(
	<Box
		bgGradient="linear(to-r,orange.300,red.500)"
		px="3vw"
		py="5vh"
	>
		<header>
			<Title />
			<Subtitle />
		</header>
	</Box>
)


export default Header;
