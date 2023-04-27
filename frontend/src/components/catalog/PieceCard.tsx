import { FC } from 'react'
import { Card, CardBody, Heading, Text, Button, ButtonGroup, Flex } from '@chakra-ui/react'
import { Piece } from '../../types/Piece';
import { EditIcon } from '@chakra-ui/icons';
import { getCookie } from 'react-use-cookie';
import Delete from '../operations/Delete';


interface PieceCardProps {
	piece: Piece
}

function formatDuration(seconds: number): string {
	const m = Math.floor(seconds / 60)
	const s = (seconds % 60).toString().padStart(2, '0');
	return `${m}' ${s}"`
}



const PieceCard: FC<PieceCardProps> = ({ piece }) => {
	const user = getCookie("currentUser");
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
							<Delete piece={piece} />
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
