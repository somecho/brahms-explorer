import { AddIcon } from "@chakra-ui/icons";
import { Button, Container } from "@chakra-ui/react";
import { FC } from "react";

interface AddProps {

}

const Add: FC<AddProps> = () => {
	return (
		<Container maxW="container.md">
			<Button
				leftIcon={<AddIcon />}
				borderRadius="25px"
				size='sm'
				colorScheme="orange"
			>
				Add a piece
			</Button>
		</Container>
	)
}

export default Add;
