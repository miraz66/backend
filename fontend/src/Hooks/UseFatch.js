import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { log } from "util";
import { empty } from "uuidv4";

function UseFatch(url, { method, headers, body } = {}) {
	const [data, setData] = useState();
	const [errorStatus, setErrorStatus] = useState();

	const navigate = useNavigate();
	const location = useLocation();

	function request() {
		fetch(url, {
			method: method,
			headers: headers,
			body: body,
		})
			.then((response) => {
				if (response.status === 401) {
					navigate("/login", {
						state: { previousUrl: location.pathname },
					});
				}
				if (!response.ok) {
					throw response.status;
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
			})
			.catch((e) => {
				setErrorStatus(e);
			});
	}

	function appendData(newData) {
		fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(newData),
		})
			.then((response) => {
				if (response.status === 401) {
					navigate("/login", {
						state: { previousUrl: location.pathname },
					});
				}

				if (!response.ok) {
					throw response.status;
				}

				return response.json();
			})
			.then((d) => {
				const subbmited = Object.values(d)[0];
				console.log("in the then", subbmited);
				console.log(data);

				const newState = { ...data };
				Object.values(newState)[0].push(subbmited);

				setData(newState);
			})
			.catch((e) => {
				console.log("Error :", e);
				setErrorStatus(e);
			});
	}

	return { request, appendData, data, errorStatus };
}

export default UseFatch;
