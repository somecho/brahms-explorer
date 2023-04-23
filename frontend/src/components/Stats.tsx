import { Box, Text } from "@chakra-ui/react"
import { queryAPI } from "../utils/api";
import { useState } from "react";
import { QueryResult } from "../types/QueryResult";

type Stat = number | string

function timestampToDatestring(timestamp: string): string {
	const date = new Date(timestamp)
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}
const Stats = () => {
	const [totalComposers, setTotalComposers] = useState<Stat>("...");
	const [totalPieces, setTotalPieces] = useState<Stat>("...");
	const [newComposers, setNewComposers] = useState<Stat>("...");
	const [newPieces, setNewPieces] = useState<Stat>("...");
	const [lastUpdated, setLastUpdated] = useState<Stat>("...")


	queryAPI<QueryResult>("pieces/count").then(r => setTotalPieces(r.size as number))
	queryAPI<QueryResult>("composers/count").then(r => setTotalComposers(r.size as number))
	queryAPI<QueryResult>("last-updated").then(r => {
		setNewComposers(r.newComposers as number)
		setNewPieces(r.newPieces as number)
		setLastUpdated(timestampToDatestring(r.timestamp as string))
	})

	return (
		<Box
			color="white"
			pt="3vh"
			fontSize={["xs", "sm"]}
			fontWeight="light"
			fontStyle="italic">
			<Text>
				A total of {totalPieces} pieces and {totalComposers} composers are in this database
			</Text>
			<Text>
				{newPieces} pieces and {newComposers} new composers added since {lastUpdated}
			</Text>
		</Box>
	)
}

export default Stats;
