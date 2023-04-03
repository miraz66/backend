import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

export default function AddCustomer(props) {
	const [name, setName] = useState([]);
	const [industry, setIndustry] = useState([]);

	// const [show, setShow] = useState(props.show);
	// const handleClose = () => setShow(false);
	// const handleShow = () => {
	// 	setShow(true);
	// };

	function subHandler(e) {
		e.preventDefault();
		props.newCustomer(name, industry);
		setName([]);
		setIndustry([]);
	}

	return (
		<div className="my-10">
			<button
				onClick={props.toggleShow}
				className="block mx-auto bg-purple-600 px-10 py-3 active:bg-purple-400 text-white rounded-md"
			>
				+ Add Customer
			</button>

			<Modal
				show={props.show}
				onHide={props.toggleShow}
				backdrop="static"
				keyboard={false}
			>
				<Modal.Header closeButton>
					<Modal.Title> + Add Customer</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<form
						id="editModal"
						className="w-full max-w-sm"
						onSubmit={(e) => subHandler(e)}
					>
						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="role"
								>
									Customer Name:
								</label>
							</div>
							<div className="md:w-2/3">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="role"
									type="text"
									placeholder="Johan smit"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
						</div>

						<div className="md:flex md:items-center mb-6">
							<div className="md:w-1/3">
								<label
									className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
									htmlFor="industry"
								>
									Industry:
								</label>
							</div>
							<div className="md:w-2/3">
								<input
									className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
									id="industry"
									type="text"
									placeholder="Industry..."
									value={industry}
									onChange={(e) => setIndustry(e.target.value)}
								/>
							</div>
						</div>
					</form>
				</Modal.Body>
				<Modal.Footer>
					<button
						className="bg-gray-500 text-white px-4 py-2 rounded-md active:bg-gray-400"
						onClick={props.toggleShow}
					>
						Close
					</button>

					<button
						form="editModal"
						className="bg-purple-600 text-white px-4 py-2 rounded-md active:bg-blue-400"
					>
						Add
					</button>
				</Modal.Footer>
			</Modal>
		</div>
	);
}
