import { Text, FormControl, FormLabel, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, NumberInput, NumberInputField, ButtonGroup, Button } from "@chakra-ui/react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { ModalProps } from "../../types/ModalProps";

interface AddFormModalProps extends ModalProps {

}
type FormState = [string, string, string, string];

const fields = [
	{ isRequired: true, label: "Title", placeholder: "...string quartet nr. 69..." },
	{ isRequired: false, label: "Subtitle", placeholder: "for..." },
	{ isRequired: true, label: "Composer", placeholder: "composer..." },
	{ isRequired: false, label: "Year", placeholder: "2023-..." },
]

const AddFormModal: FC<AddFormModalProps> = ({
	isOpen, onClose
}) => {
	const [formState, setFormState] = useState<FormState>(["", "", "", ""])
	const [submitDisabled, setSubmitDisabled] = useState<boolean>(true)

	function onChange(e: ChangeEvent<HTMLInputElement>, i: number) {
		const value = e.target.value;
		let curState = [...formState];
		curState[i] = value;
		setFormState(curState as FormState)
	}
	useEffect(() => {
		setSubmitDisabled(formState[0] === "" || formState[2] === "")
	}, [formState])
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>Add a piece</ModalHeader>
				<ModalBody>
					<Text>Click on the fields to edit</Text>
					{fields.map((f, i) => (
						<FormControl isRequired={f.isRequired} my="1em" key={f.label}>
							<FormLabel fontWeight="bold" my="0">{f.label}</FormLabel>
							<Input
								variant='unstyled'
								placeholder={f.placeholder}
								onChange={(e) => onChange(e, i)}></Input>
						</FormControl>
					))}
				</ModalBody>
				<ModalFooter>
					<ButtonGroup>
						<Button
							colorScheme={submitDisabled ? "gray" : "orange"}
							isDisabled={submitDisabled}
						>
							Submit</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ButtonGroup>
				</ModalFooter>
			</ModalContent>
		</Modal >

	)
}
export default AddFormModal;
