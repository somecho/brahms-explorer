import { FC } from "react";
import { Heading } from "@chakra-ui/react";

interface TitleProps { }

const Title: FC<TitleProps> = () => {
	return (
		<Heading
			as="h1"
			fontSize={["3xl","5xl"]}
			fontWeight="black"
			color="white">The B.R.A.H.M.S. Explorer</Heading>
	)
}

export default Title
