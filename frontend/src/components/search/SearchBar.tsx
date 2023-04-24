import { Container, Center, Input, IconButton, Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import { SearchIcon } from "@chakra-ui/icons";
import ButtonSelectPanel from "./ButtonSelectPanel";
import { Button } from "../../types/Button";
import { Params } from "../../types/Params";
import { Ordering } from "../../types/Ordering";

interface SearchBarProps {
	queryParams: Params,
	onSearch: (keywords: string) => void;
	sort: Button[],
	order: Button[],
	setSort: Ordering,
	setOrder: Ordering,
	resultsSize: number,
	isLoading: boolean
}

const SearchBar: FC<SearchBarProps> = (props: SearchBarProps) => {
	const [keywords, setKeywords] = useState(
		(props.queryParams.keywords as string)
			.replace(',', ' ') || "");

	return (
		<Container p="0.5em" my="1em">
			<Center p="0.2em">
				<Flex >
					<Input
						placeholder="search keywords..."
						id="search-input"
						name="search-input"
						htmlSize={64}
						value={keywords}
						onChange={(e) => setKeywords(e.target.value)}
					/>
					<IconButton
						colorScheme="red"
						aria-label="Search database"
						icon={<SearchIcon />}
						onClick={() => props.onSearch(keywords)}
						isLoading={props.isLoading}
						mx='4px'
					/>
				</Flex>
			</Center>
			<Flex justify="center" wrap="wrap" mb={['0.5em', '0em']}>
				<ButtonSelectPanel buttons={props.sort} onClick={props.setSort} />
				<ButtonSelectPanel buttons={props.order} onClick={props.setOrder} />
			</Flex>
		</Container>
	);
};

export default SearchBar;
