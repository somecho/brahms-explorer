import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { FC } from "react"

interface DeleteSuccessModalProps {
	isOpen: boolean,
	onClose: () => void
}

const DeleteSuccessModal: FC<DeleteSuccessModalProps> =
	({ isOpen, onClose }) => {
		return (
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Deleted</ModalHeader>
					<ModalBody>
						Successfully deleted.
					</ModalBody>
					<ModalFooter>
						<ButtonGroup>
							<Button onClick={onClose}>
								Close
							</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
		)
	}

export default DeleteSuccessModal
