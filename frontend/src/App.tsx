import { ChakraProvider } from "@chakra-ui/react";
import { useState } from 'react'
import Header from "./components/header/Header";
import { Route, Routes, Link as ReactLink } from "react-router-dom";
import { extendTheme } from "@chakra-ui/react";
import "./fonts.css"
import About from "./components/pages/About";
import Login from "./components/pages/Login";
import Search from "./components/pages/Search";

const theme = extendTheme({
	fonts: {
		heading: `'Inter'`,
		body: `'Inter'`
	}
})

function App() {
	return (
		<ChakraProvider theme={theme}>
			<div className="App">
				<Header />
				<Routes>
					<Route path="/" element={<Search />}></Route>
					<Route path="/about" element={<About />}></Route>
					<Route path="/login" element={<Login />}></Route>
				</Routes>
			</div>
		</ChakraProvider>
	);
}

export default App;
