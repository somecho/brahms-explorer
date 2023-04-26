import { Box, Text } from "@chakra-ui/react"
import { queryAPI } from "../utils/api";
import { useEffect, useState } from "react";
import { QueryResult } from "../types/QueryResult";

type Stat = number | string
interface Stats {
	totalPieces: Stat,
	totalComposers: Stat,
	newComposers: Stat,
	newPieces: Stat,
	lastUpdated: Stat
}

function timestampToDatestring(timestamp: string): string {
	const date = new Date(timestamp)
	return date.toLocaleDateString('en-GB', {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	})
}
const Stats = () => {
	const [stats, setStats] = useState<Stats>({
		totalPieces: "...",
		totalComposers: "...",
		newComposers: "...",
		newPieces: "...",
		lastUpdated: "..."
	});

	useEffect(() => {
		Promise.all(
			[
				queryAPI<QueryResult>("pieces/count"),
				queryAPI<QueryResult>("composers/count"),
				queryAPI<QueryResult>("last-updated")
			]).then(r => {
				setStats({
					totalPieces: r[0].size as number,
					totalComposers: r[1].size as number,
					newComposers: r[2].newComposers as number,
					newPieces: r[2].newPieces as number,
					lastUpdated: timestampToDatestring(r[2].timestamp as string)
				})
			})
	}, [])

	return (
		<Box
			color="white"
			pt="3vh"
			fontSize={["xs", "sm"]}
			fontWeight="light"
			fontStyle="italic">
			<Text>
				A total of {stats.totalPieces} pieces and {stats.totalComposers} composers are in this database
			</Text>
			<Text>
				{stats.newPieces} pieces and {stats.newComposers} new composers added since {stats.lastUpdated}
			</Text>
		</Box>
	)
}

export default Stats;
