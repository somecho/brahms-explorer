import "./fonts.css"
import About from "./components/pages/About";
import Header from "./components/header/Header";
import Login from "./components/pages/Login";
import Search from "./components/pages/Search";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Route, Routes, Link as ReactLink } from "react-router-dom";
import { useState } from 'react'

const theme = extendTheme({
	fonts: {
		heading: `'Inter'`,
		body: `'Inter'`
	}
})


function App() {
	const [appData, setAppData] = useState<{ [key: string]: string }>({});
	function onLoginSuccess(userData: { [key: string]: string | boolean }) {
		setAppData({ ...appData, currentUser: userData.name as string })
	}
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Search />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/login" element={<Login onLoginSuccess={onLoginSuccess} />}></Route>
				</Routes>
			</div>
		</ChakraProvider>
	);
}

export default App;
