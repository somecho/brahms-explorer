import Results from "../search/Results";
import SearchBar from "../search/SearchBar";
import Spinner from "../search/Spinner";
import { Criteria } from "../../types/Ordering";
import { Params } from "../../types/Params";
import { Piece } from "../../types/Piece";
import { buildKeywordsQuery, buildQueryString, queryAPI } from "../../utils/api";
import { orderButtons, sortButtons } from "../../types/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useEffect, useState } from "react";
import { Container, Text, useDisclosure } from "@chakra-ui/react";
import DeleteSuccessModal from "../operations/DeleteSuccessModal";

const Search = () => {
	const [pieces, setPieces] = useState<Piece[]>([]);
	const [resultsSize, setResultsSize] = useState<number>(-1);
	const query = useQuery();
	const navigate = useNavigate();
	window.onpopstate = (_) => navigate(0);

	const [queryParams, setQueryParams] = useState<Params>({
		orderBy: "title",
		ascending: true,
	});

	const setSort = (orderBy: Criteria) => {
		setQueryParams({ ...queryParams, orderBy });
		setPieces([]);
	};

	const setOrder = (ascending: Criteria) => {
		setQueryParams({ ...queryParams, ascending });
		setPieces([]);
	};

	function handleSearch(keywords: string) {
		const kw: string[] = keywords.split(" ").filter((s) => s !== "");
		const url = keywords.length ? `/?${buildQueryString({
			keywords: buildKeywordsQuery(kw)
		})}` : "/";
		//prevent double searching
		if (keywords != query.get("keywords")) {
			setPieces([]);
			navigate(url);
		}
	};

	useEffect(() => {
		if (pieces.length == 0) {
			queryCatalog({
				orderBy: queryParams.orderBy,
				ascending: queryParams.ascending,
				limit: 10,
				offset: 0,
				keywords: query.get("keywords") as Criteria,
				count: pieces.length == 0
			})
		}
	}, [pieces])

	const queryCatalog = (params: Params) => {
		queryAPI<{ results: Piece[], count?: number }>('pieces', params)
			.then(data => {
				if (data.count) {
					setResultsSize(data.count as number)
				}
				setPieces(pieces.concat(data.results as Piece[]));
			});
	};

	const deleteDisclosure = useDisclosure();
	function onDelete(id: number) {
		setPieces(pieces.filter(p => p.id !== id))
		deleteDisclosure.onOpen()
	}

	return (
		<>
			<SearchBar
				onSearch={handleSearch}
				sort={sortButtons}
				order={orderButtons}
				setSort={setSort}
				setOrder={setOrder}
				isLoading={pieces.length === 0 && resultsSize !== 0}
			/>
			<Spinner isLoading={pieces.length === 0 && resultsSize !== 0} />
			<Container maxW="container.md">
				{pieces.length !== 0 && resultsSize > 0 &&
					<Text fontSize="xs" color="gray.300">{resultsSize} Results</Text>
				}
			</Container>
			<Results
				next={() => {
					queryCatalog({
						orderBy: queryParams.orderBy,
						ascending: queryParams.ascending,
						limit: 10,
						offset: pieces.length,
						keywords: query.get("keywords") || "",
					})
				}}
				onDelete={onDelete}
				hasMore={pieces.length !== resultsSize}
				isLoading={pieces.length === 0 && resultsSize !== 0}
				pieces={pieces}
			/>
			<DeleteSuccessModal
				isOpen={deleteDisclosure.isOpen}
				onClose={deleteDisclosure.onClose}
			/>
		</>
	);
};
export default Search;
