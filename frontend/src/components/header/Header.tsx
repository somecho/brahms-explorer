import { FC } from "react"
import { Box } from "@chakra-ui/react";
import Title from "./Title";
import Subtitle from "./Subtitle";
import Navigation from "../navigation/Navigation";
import Stats from "../Stats";


interface HeaderProps { }

const Header: FC<HeaderProps> = () =>
(
	<Box
		bgGradient="linear(to-r,orange.300,red.500)"
		px="3vw"
		py="5vh"
	>
		<header>
			<Navigation />
			<Title />
			<Subtitle />
			<Stats />
		</header>
	</Box>
)


export default Header;
