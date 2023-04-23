import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AddCustomer from "../Components/AddCustomer";
import { baseUrl } from "../Components/Shared";
// import { LoginContext } from "../App";
import UseFatch from "../Hooks/UseFatch";

function Customers() {
	const [show, setShow] = useState(false);
	// const [loggedIn, setLoggedIn] = useContext(LoginContext);
	//const [customers, setCustomers] = useState();
	// const navigate = useNavigate();
	// const location = useLocation();

	function toggleShow() {
		setShow(!show);
	}

	const url = baseUrl + "api/customers/";

	const {
		request,
		appendData,
		data: { customers } = {},
		errorStatus,
	} = UseFatch(url, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + localStorage.getItem("access"), //Bearar gap is importent
		},
	});

	useEffect(() => {
		request();
	}, []);

	useEffect(() => {
		console.log(customers, "Error satatus: ", errorStatus);
	});

	/*useEffect(() => {
		const url = baseUrl + "api/customers/";

		fetch(url, {
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
				return response.json();
			})
			.then((data) => {
				setCustomers(data.customers);
			});
	}, []);

	*/

	function newCustomer(name, industry) {
		appendData({ name: name, industry: industry });

		if (!errorStatus) {
			toggleShow();
		}

		//------------------------------------------------------//
		/*const data = { name: name, industry: industry };
		const url = baseUrl + "api/customers/";

		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + localStorage.getItem("access"), //Bearar gap is importent
			},
			body: JSON.stringify(data),
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Something went worng...");
				}
				return response.json();
			})
			.then((data) => {
				//assmue the add was succesful
				//hide the modal
				toggleShow();
				//make sure the list is updated appropriately
				console.log(data);
				setCustomers([...customers, data.customer]);
			})
			.catch((e) => {
				console.log(e);
			});*/
	}

	return (
		<div className="w-9/12 pb-10 mt-5 mx-auto">
			<h1 className="text-gray-500">Here are your customer:</h1>
			<ul>
				{customers
					? customers.map((customer) => {
							return (
								<li key={customer.id} className="my-3">
									<Link
										className="no-underline bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-400"
										to={"/customers/" + customer.id}
									>
										{customer.name}
									</Link>
								</li>
							);
					  })
					: null}
			</ul>

			<AddCustomer
				newCustomer={newCustomer}
				show={show}
				toggleShow={toggleShow}
				errorStatus={errorStatus}
			/>
		</div>
	);
}

export default Customers;
