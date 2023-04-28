import InfiniteScroll from "react-infinite-scroll-component";
import { Center, Container, Text } from "@chakra-ui/react";
import PieceCard from "../catalog/PieceCard";
import { FC } from "react";
import { Piece } from "../../types/Piece";

interface ResultProps {
	next: () => void,
	hasMore: boolean,
	isLoading: boolean,
	pieces: Piece[],
	onDelete: (id: number) => void
}

const Results: FC<ResultProps> = (props: ResultProps) => {
	return (
		<>
			{
				(props.pieces.length > 0 || props.isLoading) &&
				<InfiniteScroll
					dataLength={props.pieces.length}
					next={() => props.next()}
					hasMore={props.hasMore}
				>
					<Container maxW="container.md">
						{props.pieces.map(p => <PieceCard piece={p} key={p.id} onDelete={props.onDelete} />)}
					</Container>
				</InfiniteScroll>
			}
			{
				!props.hasMore && !props.pieces &&
				<Center>
					<Text>No results found...</Text>
				</Center>
			}
			{
				!props.hasMore && props.pieces &&
				<Container maxW="container.md">
					<Text
						color="gray.300"
						fontSize="xs"
						my="2em">
						Can't find what you're looking for but you know
						the piece exists? Please reach out!
					</Text>
				</Container>
			}
		</>
	);
};

export default Results;
