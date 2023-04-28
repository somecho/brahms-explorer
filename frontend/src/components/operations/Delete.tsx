import { FC } from "react"
import { DeleteIcon } from "@chakra-ui/icons"
import { Button, ButtonGroup, Flex, Modal, ModalBody, ModalContent, Text, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { getCookie } from "react-use-cookie"
import { getUrl } from "../../utils/api"
import { Piece } from "../../types/Piece"
import SimpleModal from "../shared/Modal"

function checkIsAdmin() {
	const url = getUrl()
	return fetch(`${url}/api/isAdmin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ accessToken: getCookie("access_token") })
	})
}

function deletePiece(id: number, onConfirm: () => void) {
	fetch(`${getUrl()}/api/piece/${id}`, {
		method: "DELETE",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ accessToken: getCookie("access_token") })
	}).then(_ => {
		onConfirm()
	})
}

interface DeleteProps {
	piece: Piece,
	onDelete: (id: number) => void
}

const Delete: FC<DeleteProps> = ({ piece, onDelete }) => {
	const startDelete = useDisclosure()
	const notAdmin = useDisclosure()
	return (
		<>
			<Button size="xs" variant="ghost" p="0" colorScheme='red'>
				<DeleteIcon onClick={
					() => {
						checkIsAdmin()
							.then(res => res.json())
							.then(d => {
								if (d.isAdmin) {
									startDelete.onOpen()
								} else {
									notAdmin.onOpen()
								}
							})
					}
				} />
			</Button>
			{/* STAGE ONE */}
			<Modal isOpen={startDelete.isOpen} onClose={startDelete.onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Confirm delete</ModalHeader>
					<ModalBody>
						<Flex>
							<Text>
								Are you sure you want to delete <b>{piece.title}</b>?
							</Text>
						</Flex>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup>
							<Button onClick={() => {
								deletePiece(piece.id, () => {
									startDelete.onClose();
									onDelete(piece.id)
								})
							}} colorScheme="red">delete</Button>
							<Button onClick={startDelete.onClose}>cancel</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<SimpleModal
				isOpen={notAdmin.isOpen}
				onClose={notAdmin.onClose}
				header="Not enough permissions"
				body="Only admins can modify the database. 
							Reach out if you want to become an admin.
							If you are an admin and you are seeing this, your session has expired.
							Please logout and login again."
			/>
		</>
	)
}

export default Delete
