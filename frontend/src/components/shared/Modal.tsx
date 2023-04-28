import { Button, ButtonGroup, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react"
import { FC } from "react"

interface SimpleModalProps {
	isOpen: boolean,
	onClose: () => void,
	header: string,
	body: string,
	buttonText?: string,
}
const SimpleModal: FC<SimpleModalProps> = ({
	isOpen, onClose, header, body, buttonText = "close"
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{header}</ModalHeader>
				<ModalBody>
					{body}
				</ModalBody>
				<ModalFooter>
					<ButtonGroup>
						<Button onClick={onClose}>
							{buttonText}
						</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal>

	)
}

export default SimpleModal
