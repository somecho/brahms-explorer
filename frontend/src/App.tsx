import { ChakraProvider } from "@chakra-ui/react";
import { useState } from 'react'
import {
	Container,
	Center,
	Heading,
	Show,
	Stack,
	Link,
	Text,
} from "@chakra-ui/react";
import Catalog from "./components/Catalog";
import Header from "./components/header/Header";
import { Route, Routes, Link as ReactLink } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
import "./fonts.css"

const theme = extendTheme({
	fonts: {
		heading: `'Inter'`,
		body: `'Inter'`
	}
})

function About(): JSX.Element {
	return (
		<Container my="2em">
			<Text>
				The B.R.A.H.M.S Explorer is made with data scraped from{" "}
				<Link
					href="https://brahms.ircam.fr/en/"
					fontStyle="italic"
					color="blue.600"
					target="_blank"
				>
					IRCAM's B.R.A.H.M.S.
				</Link>{" "}
				database. It was made for the purpose of literature research for
				ensembles and musicians. Its creator is{" "}
				<Link
					href="https://somecho.github.io/"
					color="blue.600"
					target="_blank"
				>
					Somē Cho
				</Link>
				. The source code can be found{" "}
				<Link
					href="https://github.com/somecho/brahms-explorer"
					color="blue.600"
					target="_blank"
				>
					here
				</Link>
				.
			</Text>
		</Container>
	);
}
function PageSubheader({ padding, align }) {
	return (
		<>
			<Heading
				as="h2"
				size="xs"
				my="1.0em"
				mx="0.5em"
				align={align}
				bgGradient="linear(to-l,orange.300,red.400)"
				bgClip="text"
			>
				A searchable catalog for contemporary music based on data collected by{" "}
				<Link href="https://brahms.ircam.fr/en/" color="blue.400" target="_blank">
					IRCAM.
				</Link>
			</Heading>
		</>
	);
}

function App() {
	const [lastUpdated, setLastUpdated] = useState("")
	const [newComposers, setNewComposers] = useState(0)
	const [newPieces, setNewPieces] = useState(0)
	fetch("https://brahms-crud.onrender.com/api/last-updated")
		.then(r => r.json())
		.then((d) => {
			const date = new Date(d.timestamp)
			const dateString = date.toLocaleDateString('en-GB', {
				year: 'numeric',
				month: 'long',
				day: 'numeric'
			})
			setLastUpdated(dateString)
			setNewComposers(d.newComposers)
			setNewPieces(d.newPieces)
		})


	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Catalog />}></Route>
					<Route path="/about" element={<About />}></Route>
				</Routes>
			</div>
		</ChakraProvider>
	);
}

export default App;
