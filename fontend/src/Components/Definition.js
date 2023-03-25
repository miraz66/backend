import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import NotFound from "./NotFound";
import DefinitionSearch from "./DefinitionSearch";

function Definition() {
  const [word, setWord] = useState();
  const [notFound, setnotFound] = useState(false);
  const [error, setError] = useState(false);

  let { search } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
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
  }, []);

  if (notFound) {
    return (
      <>
        <NotFound />
        <Link className="pl-20 text-xl" to="/dictionary">
          Search another
        </Link>
      </>
    );
  }

  if (error) {
    return (
      <>
        <p className="pl-20 pt-10">Something want worng. try agin!</p>
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
          {word.map((e) => {
            return (
              <p key={uuidv4()}>
                {" "}
                {e.partOfSpeech} : {e.definitions[0].definition}
              </p>
            );
          })}
        </>
      ) : null}
      <DefinitionSearch />
    </div>
  );
}

export default Definition;
