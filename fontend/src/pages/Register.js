import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../Components/Shared";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../App";

function Register() {
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [email, setEmail] = useState();

	const location = useLocation();
	const navigate = useNavigate();
	const [loggedIn, setLoggedIn] = useContext(LoginContext);

	useEffect(() => {
		localStorage.clear();
		setLoggedIn(false);
	});

	function login(e) {
		e.preventDefault();
		const url = baseUrl + "api/register/";

		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email,
				username: username,
				password: password,
			}),
		})
			.then((response) => {
				if (response.ok) {
					setLoggedIn(true);
				}
				return response.json();
			})
			.then((data) => {
				localStorage.setItem("access", data.access);
				localStorage.setItem("refresh", data.refresh);
				navigate(
					location?.state?.previousUrl
						? location.state.previousUrl
						: "/customers"
				);
			});
	}

	return (
		<div className="p-20">
			<form id="customer" onSubmit={login}>
				<div className="md:flex md:items-center mb-6 w-7/12">
					<div className="md:w-1/6">
						<label htmlFor="email" className="">
							Email:
						</label>
					</div>
					<div className="md:w-1/6">
						<input
							id="email"
							type="text"
							className=" px-4 h-8 block  py-4 bg-white appearance-none border-2 border-gray-200 rounded   text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							value={email}
							onChange={(e) => {
								setEmail(e.target.value);
							}}
						/>
					</div>
				</div>

				<div className="md:flex md:items-center mb-6 w-7/12">
					<div className="md:w-1/6">
						<label htmlFor="username" className="">
							Username:
						</label>
					</div>
					<div className="md:w-1/6">
						<input
							id="username"
							type="text"
							className=" px-4 h-8 block  py-4 bg-white appearance-none border-2 border-gray-200 rounded   text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							value={username}
							onChange={(e) => {
								setUsername(e.target.value);
							}}
						/>
					</div>
				</div>

				<div className="md:flex md:items-center mb-6 w-7/12">
					<div className="md:w-1/6">
						<label htmlFor="password" className="">
							Password:
						</label>
					</div>
					<div className="md:w-1/6">
						<input
							id="password"
							type="password"
							className=" px-4 h-8 block py-4 bg-white appearance-none border-2 border-gray-200 rounded   text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
					</div>
				</div>

				<button className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-500 active:border border-black">
					Register
				</button>
			</form>
		</div>
	);
}

export default Register;
