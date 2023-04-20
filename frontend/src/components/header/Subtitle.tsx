import { FC } from "react";
import { Heading } from "@chakra-ui/react"

interface SubtitleProps { }

const Subtitle: FC<SubtitleProps> = () => {
	return (
		<Heading
			as="h2"
			fontSize="2xl"
			color="white"
			my="1vh"
		>
			A searchable catalog for contemporary music based on data by IRCAM
		</Heading>
	)
}

export default Subtitle
