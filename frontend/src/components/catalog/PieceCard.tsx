import { FC } from 'react'
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'
import { Piece } from '../../types/Piece';


interface PieceCardProps {
	piece: Piece
}

function formatDuration(seconds: number): string {
	const m = Math.floor(seconds / 60)
	const s = (seconds % 60).toString().padStart(2, '0');
	return `${m}' ${s}"`
}

const PieceCard: FC<PieceCardProps> = ({ piece }) => {
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
				<Text>
					{piece.year}
				</Text>
				{piece.duration !== 0 &&
					<Text>
						{formatDuration(piece.duration)}
					</Text>
				}
			</CardBody>
		</Card>
	)
}

export default PieceCard
