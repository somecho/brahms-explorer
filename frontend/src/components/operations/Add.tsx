import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import AddFormModal from "./AddFormModal";

interface AddProps {

}

const Add: FC<AddProps> = () => {
	const add = useDisclosure();
	return (
		<Container maxW="container.md">
			<Button
				leftIcon={<AddIcon />}
				borderRadius="25px"
				size='sm'
				colorScheme="orange"
				onClick={add.onOpen}
			>
				Add a piece
			</Button>
			<AddFormModal
				isOpen={add.isOpen}
				onClose={add.onClose}
			/>
		</Container>
	)
}

export default Add;
