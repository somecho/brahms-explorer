import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import { FC } from "react";
import { ModalProps } from "../../types/ModalProps";

interface AddFormModalProps extends ModalProps {

}


const AddFormModal: FC<AddFormModalProps> = ({
	isOpen, onClose
}) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add a piece</ModalHeader>
				<ModalBody>
					<ModalFooter>

					</ModalFooter>
				</ModalBody>
			</ModalContent>
		</Modal>

	)
}
export default AddFormModal;
