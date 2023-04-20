import { FC } from "react";
import { Heading } from "@chakra-ui/react";

interface TitleProps { }

const Title: FC<TitleProps> = () => {
	return (
		<Heading
			as="h1"
			fontSize="5xl"
			fontWeight="extrabold"
			color="white">The B.R.A.H.M.S. Explorer</Heading>
	)
}

export default Title
