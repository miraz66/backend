import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import NotFound from "./NotFound";

//import NotFound from "./NotFound";
import DefinitionSearch from "./DefinitionSearch";
import UseFatch from "../Hooks/UseFatch";

function Definition() {
	// const [word, setWord] = useState();
	//const [notFound, setnotFound] = useState(false);
	//const [error, setError] = useState(false);

	//const navigate = useNavigate();
	//const location = useLocation();
	let { search } = useParams();

	const {
		data: [{ meanings: word }] = [{}],
		errorStatus,
		request,
	} = UseFatch("https://api.dictionaryapi.dev/api/v2/entries/en/" + search);

	useEffect(() => {
		request();
	});

	/*useEffect(() => {
		// const url = "http://httpstat.us/500";
		const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + search;
		fetch(url)
			.then((response) => {
				console.log(response.status);
				if (response.status === 404) {
					setnotFound(true);
				} else if (response.status === 401) {
					navigate("/login");
				} else if (response.status === 500) {
					setError(true);
				}

				if (!response.ok) {
					setError(true);

					throw new Error("Something went worng!");
				}

				return response.json();
			})

			.then((data) => {
				setWord(data[0].meanings);
			})
			.catch((e) => {
				console.log(e.message);
			});
	}, []); */

	if (errorStatus === 404) {
		return (
			<>
				<NotFound />
				<Link className="pl-20 text-xl" to="/dictionary">
					Search another
				</Link>
			</>
		);
	}

	if (errorStatus) {
		return (
			<>
				<p className="pl-20 pt-10">
					There was a problem with the server. try agin latter!
				</p>
				<Link className="pl-20 text-xl" to="/dictionary">
					Search another
				</Link>
			</>
		);
	}

	return (
		<div className="p-10">
			{word ? (
				<>
					<h1 className="text-blue-800">Here is a Definition</h1>
					{word.map((meaning) => {
						return (
							<p key={uuidv4()}>
								{" "}
								{meaning.partOfSpeech} : {meaning.definitions[0].definition}
							</p>
						);
					})}
					<p>Search agin</p>
					<DefinitionSearch />
				</>
			) : null}
		</div>
	);
}

export default Definition;
