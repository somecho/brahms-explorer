import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import AddFormModal from "./AddFormModal";
import { checkIsAdmin } from "../../utils/api";

interface AddProps {

}

const Add: FC<AddProps> = () => {
	const add = useDisclosure();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);
	checkIsAdmin()
		.then(d => d.json())
		.then(d => setIsAdmin(d.isAdmin))
	return isAdmin && (
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
