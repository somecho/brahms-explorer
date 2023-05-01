import { AddIcon } from "@chakra-ui/icons";
import { Button, Container, useDisclosure } from "@chakra-ui/react";
import { FC, useState } from "react";
import AddFormModal from "./AddFormModal";
import { checkIsAdmin } from "../../utils/api";
import NotAdminModal from "../shared/NotAdminModal";

interface AddProps {

}

const Add: FC<AddProps> = () => {
	const add = useDisclosure();
	const notAdmin = useDisclosure();
	const [isAdmin, setIsAdmin] = useState<boolean>(false);

	checkIsAdmin()
		.then(d => d.json())
		.then(d => setIsAdmin(d.isAdmin))

	// double checking
	function openModal() {
		checkIsAdmin()
			.then(d => d.json())
			.then(d => {
				if (d.isAdmin) {
					add.onOpen()
				} else {
					notAdmin.onOpen()
				}
			})
	}

	return isAdmin && (
		<Container maxW="container.md">
			<Button
				leftIcon={<AddIcon />}
				borderRadius="25px"
				size='sm'
				colorScheme="orange"
				onClick={openModal}
			>
				Add a piece
			</Button>
			<AddFormModal
				isOpen={add.isOpen}
				onClose={add.onClose}
			/>
			<NotAdminModal isOpen={notAdmin.isOpen} onClose={notAdmin.onClose}></NotAdminModal>
		</Container>
	)
}

export default Add;
