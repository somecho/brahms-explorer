import CatalogTable from "./CatalogTable";
import SearchBar from "./SearchBar";
import { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Center, Spinner } from "@chakra-ui/react";
import { buildQueryString, queryAPI } from "../utils/api";
import { Piece } from "../types/Piece";
import { Button } from "../types/Button";
import { Params } from "../types/Params";
import { QueryResult } from "../types/QueryResult";
import { Criteria } from "../types/Ordering";

/**
 * Formats an array of words to be sent via URL query string
 * @param {String[]} arr An array of words (Strings)
 * @return {String} The words formatted into a no-space comma separated string
 */
function buildKeywordsQuery(arr: string[]): string {
	let query = "";
	for (let i = 0; i < arr.length; i++) {
		query += arr[i];
		if (i !== arr.length - 1) {
			query += ",";
		}
	}
	return query;
};

const sortButtons: Button[] = [
	{ text: "Title", field: "title" },
	{ text: "Subtitle", field: "subtitle" },
	{ text: "Composer first name", field: "firstName" },
	{ text: "Composer last name", field: "lastName" },
	{ text: "Year", field: "year" },
];

const orderButtons: Button[] = [
	{ text: "asc", field: "true" },
	{ text: "desc", field: "false" },
];

function useQuery() {
	const { search } = useLocation();
	return useMemo(() => new URLSearchParams(search), [search]);
}

const Catalog = () => {
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

	// Get data from API and append to `pieces`
	const queryCatalog = () => {
		// let url = `${endpoint}/api/pieces?${buildQueryString(queryParams)}`;
		queryAPI<Piece[]>('pieces', queryParams)
			.then(data => {
				setPieces(pieces.concat(data));
				setQueryParams({
					...queryParams,
					offset: queryParams.offset as number + data.length,
				});
			});
	};

	// Get size of search result from API and calls `setCatalogSize`
	const queryResultsSize = () => {
		// let url = `${endpoint}/api/pieces/count?${buildQueryString(queryParams)}`;
		// fetch(url)
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
			{pieces.length === 0 && catalogSize !== 0 ? (
				<Center>
					<Spinner color="red.500" size="lg" />
				</Center>
			) : (
				<CatalogTable
					next={queryCatalog}
					resultsSize={catalogSize}
					hasMore={pieces.length !== catalogSize}
					isLoading={pieces.length === 0 && catalogSize !== 0}
					pieces={pieces}
				/>
			)}
		</>
	);
};
export default Catalog;
