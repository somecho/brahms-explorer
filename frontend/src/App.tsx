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
					href="https://github.com/somecho/catalog-for-contemporary-music"
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
		<ChakraProvider>
			<div className="App">
			<Header />
				<Center>
					<Heading
						as="h1"
						size="2xl"
						p="0.5em"
						textAlign={["center", "left"]}
						bgGradient="linear(to-l,orange.300,red.400)"
						fontWeight="extrabold"
						bgClip="text"
					>
						The B.R.A.H.M.S. Explorer
					</Heading>
					<Show above="sm">
						<PageSubheader padding="0.5em" align="left" />
					</Show>
				</Center>
				<Show below="sm">
					<Center>
						<PageSubheader align="center" />
					</Center>
				</Show>
				<Center>
					<Text textAlign="center" m="0.5em" fontSize="xs" color="gray.400">
						This database was last updated on {lastUpdated}.{" "}
						{newPieces} new pieces and {newComposers}{" "}
						new composers were added.
					</Text>
				</Center>
				<nav>
					<Center>
						<Stack direction="row">
							<Link as={ReactLink} to="/about" color="blue.600">
								about
							</Link>
							<Text>/</Text>
							<Link as={ReactLink} to="/" color="blue.600">
								search
							</Link>
						</Stack>
					</Center>
				</nav>
				<Routes>
					<Route path="/" element={<Catalog />}></Route>
					<Route path="/about" element={<About />}></Route>
				</Routes>
			</div>
		</ChakraProvider>
	);
}

export default App;
