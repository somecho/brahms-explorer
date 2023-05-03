import { EditIcon } from "@chakra-ui/icons";
import { Button, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";
import { checkIsAdmin } from "../../utils/api";
import NotAdminModal from "../shared/NotAdminModal";
import EditModal from "./EditModal";
import { Piece } from "../../types/Piece";

interface EditProps {
	piece: Piece
}

const Edit: FC<EditProps> = ({ piece }) => {
	const openEdit = useDisclosure()
	const notAdmin = useDisclosure()
	return (
		<>
			<Button
				size="xs"
				variant="ghost"
				p="0"
				colorScheme='gray'
				onClick={() => {
					checkIsAdmin()
						.then(res => res.json())
						.then(d => {
							if (d.isAdmin) {
								openEdit.onOpen()
							} else {
								notAdmin.onOpen()
							}
						})
				}}
			>
				<EditIcon />
			</Button>
			<EditModal isOpen={openEdit.isOpen} onClose={openEdit.onClose} piece={piece} />
			<NotAdminModal isOpen={notAdmin.isOpen} onClose={notAdmin.onClose} />
		</>
	)
}

export default Edit
