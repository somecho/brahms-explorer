import InfiniteScroll from "react-infinite-scroll-component";
import { Center, Container, Text } from "@chakra-ui/react";
import PieceCard from "../catalog/PieceCard";
import { FC } from "react";
import { Piece } from "../../types/Piece";

interface ResultProps {
	next: () => void,
	hasMore: boolean,
	isLoading: boolean,
	pieces: Piece[]
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
						{props.pieces.map(p => <PieceCard piece={p} key={p.id} />)}
					</Container>
				</InfiniteScroll>
			}
			{
				!props.hasMore &&
				<Center>
					<Text>No results found...</Text>
				</Center>
			}
		</>
	);
};

export default Results;
