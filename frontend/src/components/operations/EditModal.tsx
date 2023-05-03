import { FC, useState } from "react";
import { ModalProps } from "../../types/ModalProps";
import { Button, ButtonGroup, FormControl, FormErrorMessage, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import { Piece } from "../../types/Piece";
import { editPiece } from "../../utils/api";
import SimpleModal from "../shared/Modal";
import { useNavigate } from "react-router-dom";

interface EditModalProps extends ModalProps {
	piece: Piece
}

const EditModal: FC<EditModalProps> = ({
	isOpen, onClose, piece }) => {
	const [title, setTitle] = useState(piece.title)
	const [year, setYear] = useState(piece.year)
	const [subtitle, setSubtitle] = useState(piece.subtitle)
	const [composer, setComposer] = useState(piece.composer)
	const [isLoading, setIsLoading] = useState(false)
	const editSuccess = useDisclosure()
	const formPadY = "0.5em";
	const navigate = useNavigate()

	function isError(field: string) {
		return field === ''
	}

	function onSubmit() {
		setIsLoading(true)
		const updatedPiece: Piece = {
			id: piece.id,
			title,
			year,
			subtitle,
			composer,
			duration: piece.duration
		}
		editPiece(updatedPiece)
			.then(r => {
				setIsLoading(false)
				if (r.status == 200) {
					onClose()
					// to prevent screen shaking
					setTimeout(editSuccess.onOpen, 100)
				}
			})
	}

	function onCloseSuccess() {
		editSuccess.onClose()
		setTimeout(() => navigate(0), 100)
	}

	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>
						Edit piece
					</ModalHeader>
					<ModalBody>
						<FormControl isRequired isInvalid={isError(title)} py={formPadY}>
							<FormLabel>Title</FormLabel>
							<Input value={title} onChange={e => setTitle(e.target.value)} />
							{isError(title) && <FormErrorMessage>Title cannot be empty</FormErrorMessage>}
						</FormControl>
						<FormControl py={formPadY}>
							<FormLabel>Subtitle</FormLabel>
							<Input value={subtitle} onChange={e => setSubtitle(e.target.value)} />
						</FormControl>
						<FormControl isRequired isInvalid={isError(composer)} py={formPadY}>
							<FormLabel>Composer</FormLabel>
							<Input value={composer} onChange={e => setComposer(e.target.value)} />
							{isError(composer) && <FormErrorMessage>Composer cannot be empty</FormErrorMessage>}
						</FormControl>
						<FormControl py={formPadY}>
							<FormLabel>Year</FormLabel>
							<Input value={year} onChange={e => setYear(e.target.value)} />
						</FormControl>
					</ModalBody>
					<ModalFooter>
						<ButtonGroup>
							<Button
								isLoading={isLoading}
								isDisabled={isError(title) || isError(composer)}
								colorScheme={isError(title) || isError(composer) ? "gray" : "orange"}
								onClick={onSubmit}
							>
								submit
							</Button>
							<Button onClick={onClose} isLoading={isLoading}>cancel</Button>
						</ButtonGroup>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<SimpleModal
				isOpen={editSuccess.isOpen}
				onClose={onCloseSuccess}
				header="Success"
				body={`${title} has been successfully updated`}
			/>
		</>
	)
}

export default EditModal;
