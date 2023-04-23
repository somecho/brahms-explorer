import { Container, Text, Link } from "@chakra-ui/react"
const About = () => {
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
	)
}
export default About;
