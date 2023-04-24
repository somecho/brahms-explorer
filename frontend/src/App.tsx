import "./fonts.css"
import About from "./components/pages/About";
import Header from "./components/header/Header";
import Login from "./components/pages/Login";
import Logout from "./components/pages/Logout";
import Search from "./components/pages/Search";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Route, Routes, Link as ReactLink } from "react-router-dom";
import { useState } from 'react'

const theme = extendTheme({
	fonts: {
		heading: `'Inter'`,
		body: `'Inter'`
	}
})

const clientId = "14313480731-m64g2td2mbpaaemhq3vov4fjkcsf5btt.apps.googleusercontent.com"

function App() {
	return (
		<GoogleOAuthProvider clientId={clientId}>
			<ChakraProvider theme={theme}>
				<div className="App">
					<Header />
					<Routes>
						<Route path="/" element={<Search />} />
						<Route path="/about" element={<About />} />
						<Route path="/login" element={<Login />} />
						<Route path="/logout" element={<Logout />} />
					</Routes>
				</div>
			</ChakraProvider >
		</GoogleOAuthProvider>
	);
}

export default App;
