import React, { useEffect, useState } from "react";
import { json, Link } from "react-router-dom";
import AddCustomer from "../Components/AddCustomer";
import { baseUrl } from "../Components/Shared";

function Customers() {
	const [customers, setCustomers] = useState();

	const [show, setShow] = useState(false);
	function toggleShow() {
		setShow(!show);
	}

	useEffect(() => {
		const url = baseUrl + "api/customers/";

		fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCustomers(data.customers);
			});
	}, []);

	function newCustomer(name, industry) {
		const data = { name: name, industry: industry };
		const url = baseUrl + "api/customers/";

		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
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
			});
	}

	return (
		<div className="w-9/12 pb-10 mt-5 mx-auto">
			<h1 className="text-gray-500">Here are your customer:</h1>
			<ul>
				{customers
					? customers.map((customer) => {
							return (
								<li key={customer.id}>
									<Link to={"/customers/" + customer.id}>{customer.name}</Link>
								</li>
							);
					  })
					: null}
			</ul>

			<AddCustomer
				newCustomer={newCustomer}
				show={show}
				toggleShow={toggleShow}
			/>
		</div>
	);
}

export default Customers;
