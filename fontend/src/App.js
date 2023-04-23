import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState } from "react";

import Header from "./Components/Header";
import AllEmployes from "./pages/AllEmployes";
import About from "./pages/About";
import Customers from "./pages/Customers";
import Project from "./pages/Project";
import Dictionary from "./pages/Dictionary";
import Definition from "./Components/Definition";
import NotFound from "./Components/NotFound";
import Customer from "./pages/Customer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { baseUrl } from "./Components/Shared";

import useFatch from "./Hooks/UseFatch";

export const LoginContext = createContext();

function App() {
	const [loggedIn, setLoggedIn] = useState(localStorage.access ? true : false);

	useEffect(() => {
		function refreshToken() {
			if (localStorage.refresh) {
				const url = baseUrl + "api/token/refresh/";

				fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						refresh: localStorage.refresh,
					}),
				})
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						localStorage.access = data.access;
						localStorage.refresh = data.refresh;
						setLoggedIn(true);
						console.log(data);
					});
			}
		}
		refreshToken();
		const minute = 1000 * 60;
		setInterval(refreshToken, minute * 1);
	});

	return (
		<LoginContext.Provider value={[loggedIn, setLoggedIn]}>
			<BrowserRouter>
				<Header>
					<Routes>
						<Route path="/" element={<AllEmployes />} />
						<Route path="/about" element={<About />} />

						<Route path="/customers" element={<Customers />} />
						<Route path="/customers/:id" element={<Customer />} />

						<Route path="/projects" element={<Project />} />

						<Route path="/dictionary" element={<Dictionary />} />
						<Route path="/dictionary/:search" element={<Definition />} />

						<Route path="/login" element={<Login />} />

						<Route path="/register" element={<Register />} />

						<Route path="/404" element={<NotFound />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Header>
			</BrowserRouter>
		</LoginContext.Provider>
	);
}

export default App;
