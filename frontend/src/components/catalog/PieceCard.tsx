import { FC } from 'react'
import { Card, CardBody, Heading, Text, Button, ButtonGroup, Flex, Modal, useDisclosure, ModalOverlay, ModalFooter, ModalBody, ModalContent, ModalHeader } from '@chakra-ui/react'
import { Piece } from '../../types/Piece';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { getCookie } from 'react-use-cookie';
import { getUrl } from '../../utils/api';


interface PieceCardProps {
	piece: Piece
}

function formatDuration(seconds: number): string {
	const m = Math.floor(seconds / 60)
	const s = (seconds % 60).toString().padStart(2, '0');
	return `${m}' ${s}"`
}

function del(accessToken: string) {
	const url = getUrl()
	fetch(`${url}/api/isAdmin`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ accessToken })
	}).then(res => console.log(res))
}

const PieceCard: FC<PieceCardProps> = ({ piece }) => {
	const user = getCookie("currentUser");
	const { isOpen, onOpen, onClose } = useDisclosure()
	return (
		<Card variant="outline" my="0.5em">
			<CardBody p="1em">
				<Heading as="h4" fontSize="md">
					{piece.title}
				</Heading>
				<Text fontWeight="200" lineHeight="calc(1em + 4px)">
					{piece.subtitle}
				</Text>
				<Text>
					{piece.composer}
				</Text>
				<Flex justify="space-between" align="flex-end">
					<div>
						<Text>
							{piece.year}
						</Text>
						{piece.duration !== 0 &&
							<Text>
								{formatDuration(piece.duration)}
							</Text>
						}
					</div>
					{user &&
						<ButtonGroup padding="0">
							<Button size="xs" variant="ghost" p="0" colorScheme='red'>
								<DeleteIcon onClick={onOpen} />
							</Button>
							<Modal isOpen={isOpen} onClose={onClose}>
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
											<Button onClick={()=>{
												  del(getCookie("access_token"))
													onClose()
												}}colorScheme="red">delete</Button>
											<Button onClick={onClose}>cancel</Button>
										</ButtonGroup>
									</ModalFooter>
								</ModalContent>
							</Modal>
							<Button size="xs" variant="ghost" p="0" colorScheme='gray'>
								<EditIcon />
							</Button>
						</ButtonGroup>
					}
				</Flex>
			</CardBody>
		</Card>
	)
}

export default PieceCard
