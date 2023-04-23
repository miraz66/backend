import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { baseUrl } from "../Components/Shared";
import { LoginContext } from "../App";

function Customer() {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const [loggedIn, setLoggedIn] = useContext(LoginContext);

	const [customer, setCustomer] = useState();
	const [tempCustomer, setTempCustomer] = useState();
	const [notFound, setNotFound] = useState();
	const [change, setChange] = useState(false);
	const [error, setError] = useState();

	//---------------------------------------------------------------------//

	useEffect(() => {
		if (!customer) return;
		if (!customer) return;

		let equal = true;
		if (customer.name !== tempCustomer.name) equal = false;
		if (customer.industry !== tempCustomer.industry) equal = false;

		if (equal) setChange(false);
	});

	//---------------------------------------------------------------------//

	useEffect(() => {
		const url = baseUrl + "api/customers/" + id;

		fetch(url, {
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"), //Bearar gap is importent
			},
		})
			.then((response) => {
				if (response.status === 404) {
					setNotFound(false);
				} else if (response.status === 401) {
					navigate("/login", {
						state: { previousUrl: location.pathname },
					});
				}

				if (!response.ok) {
					throw new Error("Something went worng, Try again leter..");
				}
				return response.json();
			})
			.then((data) => {
				setCustomer(data.customer);
				setTempCustomer(data.customer);
				setError(undefined);
			})
			.catch((e) => {
				setError(e.message);
			});
	}, [id]);

	//---------------------------------------------------------------------//

	function updateCustomer(params) {
		const url = baseUrl + "api/customers/" + id;

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"), //Bearar gap is importent
			},
			body: JSON.stringify(tempCustomer),
		})
			.then((response) => {
				if (response.status === 401) {
					navigate("/login", {
						state: { previousUrl: location.pathname },
					});
				}
				if (!response.ok) throw new Error("Something went worng..");
				return response.json();
			})
			.then((data) => {
				setCustomer(data.customer);
				setChange(false);
				setError(undefined);
			})
			.catch((e) => {
				setError(e.message);
			});
	}

	//---------------------------------------------------------------------//

	return (
		<div className="p-20">
			{notFound ? (
				<p className="text-2xl">The Customer with id {id} was not found</p>
			) : null}
			{customer ? (
				<div className="">
					<form id="customer" onSubmit={updateCustomer}>
						<div className="md:flex md:items-center mb-6 w-7/12">
							<div className="md:w-1/6">
								<label for="name" className="">
									Name:
								</label>
							</div>
							<div className="md:w-1/6">
								<input
									id="name"
									className=" px-4 h-8 block  py-4 bg-white appearance-none border-2 border-gray-200 rounded   text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									value={tempCustomer.name}
									onChange={(e) => {
										setTempCustomer({ ...tempCustomer, name: e.target.value });
										setChange(true);
									}}
								/>
							</div>
						</div>

						<div className="md:flex md:items-center mb-6 w-7/12">
							<div className="md:w-1/6">
								<label for="industry" className="">
									Industry:
								</label>
							</div>
							<div className="md:w-1/6">
								<input
									id="industry"
									className=" px-4 h-8 block py-4 bg-white appearance-none border-2 border-gray-200 rounded   text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									value={tempCustomer.industry}
									onChange={(e) => {
										setTempCustomer({
											...tempCustomer,
											industry: e.target.value,
										});
										setChange(true);
									}}
								/>
							</div>
						</div>
					</form>
					{change ? (
						<>
							<button
								form="customer"
								className="px-10 py-2 bg-gray-300 rounded-sm mr-3 active:bg-slate-500"
							>
								Save
							</button>

							<button
								onClick={(e) => {
									setTempCustomer({ ...customer });
									setChange(false);
									setError(undefined);
								}}
								className="px-10 py-2 bg-gray-300 rounded-sm mb-3 active:bg-slate-500"
							>
								Cancel
							</button>
						</>
					) : null}
					<br />
					<button
						className="bg-red-400 px-4 py-2 mb-2 active:bg-red-300"
						onClick={(e) => {
							const url = baseUrl + "api/customers/" + id;
							fetch(url, {
								method: "DELETE",
								headers: {
									"Content-Type": "application/json",
									Authorization: "Bearer " + localStorage.getItem("access"), //Bearar gap is importent
								},
							})
								.then((response) => {
									if (response.status === 401) {
										setLoggedIn(false);
										navigate("/login", {
											state: { previousUrl: location.pathname },
										});
									}
									if (!response.ok) {
										throw new Error("Something went worng...");
									}
									navigate("/customers");
								})
								.catch((e) => {
									console.log(e);
									setError(e.message);
								});
						}}
					>
						Delete
					</button>
				</div>
			) : null}

			{error ? (
				<p className="text-red-500 text-3xl font-mono">{error}</p>
			) : null}
			<br />

			<Link to="/customers">
				<button className="bg-purple-600 text-white px-6 py-2">
					{" "}
					Go back.
				</button>
			</Link>
			<p> </p>
		</div>
	);
}

export default Customer;
