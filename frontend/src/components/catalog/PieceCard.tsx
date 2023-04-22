import { FC } from 'react'
import { Card, CardBody, Heading, Text } from '@chakra-ui/react'

interface Piece {
	title: string,
	subtitle: string,
	composer: string,
	year: string,
	duration: number
}

interface PieceCardProps {
	piece: Piece
}

const PieceCard: FC<PieceCardProps> = ({ piece }) => {
	return (
		<Card variant="outline">
			<CardBody>
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
				<Text>
				{piece.duration}
				</Text>
			</CardBody>
		</Card>
	)
}

export default PieceCard
