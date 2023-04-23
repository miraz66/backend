import React, { useContext } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { baseUrl } from "../Components/Shared";
import { LoginContext } from "../App";

function Logout() {
	const [loggedIn, setLoggedIn] = useContext(LoginContext);

	return (
		<button
			className=" text-white"
			onClick={(e) => {
				const url = baseUrl + "api/customers/";
				fetch(url, {
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + localStorage.clear("access"), //Bearar gap is importent
					},
				})
					.then((response) => {
						if (response.status === 401) {
							setLoggedIn(false);
						}
						if (!response.ok) {
							throw new Error("Page Logout..");
						}
					})
					.catch((e) => {
						console.log(e);
					});
			}}
		>
			<NavLink
				to={loggedIn ? "/login" : "/login"}
				className="rounded-md px-3 py-2 text-lg font-medium first-line no-underline text-gray-300 hover:bg-gray-700 hover:text-white"
			>
				{loggedIn ? "Logout" : "Login"}
			</NavLink>
		</button>
	);
}

export default Logout;
