import Results from "../search/Results";
import SearchBar from "../search/SearchBar";
import Spinner from "../search/Spinner";
import { Criteria } from "../../types/Ordering";
import { Params } from "../../types/Params";
import { Piece } from "../../types/Piece";
import { QueryResult } from "../../types/QueryResult";
import { buildKeywordsQuery, buildQueryString, queryAPI } from "../../utils/api";
import { orderButtons, sortButtons } from "../../types/Button";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/useQuery";
import { useState } from "react";

const Search = () => {
	const [pieces, setPieces] = useState<Piece[]>([]);
	const [catalogSize, setCatalogSize] = useState<number>(-1);
	const query = useQuery();
	const navigate = useNavigate();
	window.onpopstate = (_) => navigate(0);

	const [queryParams, setQueryParams] = useState<Params>({
		orderBy: "title",
		ascending: true,
		limit: 100,
		offset: 0,
		keywords: query.get("keywords") || "",
	});

	const setSort = (orderBy: Criteria) => {
		setQueryParams({ ...queryParams, offset: 0, orderBy });
		setPieces([]);
	};

	const setOrder = (ascending: Criteria) => {
		setQueryParams({ ...queryParams, offset: 0, ascending });
		setPieces([]);
	};

	/**
	 * This callback does three things.
	 * First, it takes the input from the search bar and converts it
	 * into an array of words.
	 * Then, based on whether there are keywords, it updates the url
	 * search params.
	 * It then clears the pieces cache too force a rerender.
	 *
	 * */
	function handleSearch(keywords: string) {
		const kw: string[] = keywords.split(" ").filter((s) => s !== "");
		const formattedKeywords = buildKeywordsQuery(kw);
		setQueryParams({ ...queryParams, offset: 0, keywords: formattedKeywords });
		const url = keywords.length ? `/?${buildQueryString(queryParams)}` : "/";
		navigate(url);
		setPieces([]);
	};

	const queryCatalog = () => {
		queryAPI<Piece[]>('pieces', queryParams)
			.then(data => {
				setPieces(pieces.concat(data));
				setQueryParams({
					...queryParams,
					offset: queryParams.offset as number + data.length,
				});
			});
	};

	const queryResultsSize = () => {
		queryAPI<QueryResult>('pieces/count', queryParams)
			.then((data) => { setCatalogSize(data.size as number) });
	};

	if (pieces.length === 0 && catalogSize !== 0) {
		queryCatalog();
		queryResultsSize();
	}

	return (
		<>
			<SearchBar
				queryParams={queryParams}
				onSearch={handleSearch}
				sort={sortButtons}
				order={orderButtons}
				setSort={setSort}
				setOrder={setOrder}
				resultsSize={catalogSize}
				isLoading={pieces.length === 0 && catalogSize !== 0}
			/>
			<Spinner isLoading={pieces.length === 0 && catalogSize !== 0} />
			<Results
				next={queryCatalog}
				resultsSize={catalogSize}
				hasMore={pieces.length !== catalogSize}
				isLoading={pieces.length === 0 && catalogSize !== 0}
				pieces={pieces}
			/>
		</>
	);
};
export default Search;
