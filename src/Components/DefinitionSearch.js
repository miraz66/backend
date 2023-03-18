import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DefinitionSearch() {
  const [word, setWord] = useState();
  const navigate = useNavigate();

  return (
    <div className="">
      <form onSubmit={() => navigate("/dictionary/" + word)}>
        <input
          className="w-5/12 h-10 px-4"
          type="text"
          onChange={(e) => setWord(e.target.value)}
        />
        <button className=" h-10 bg-gray-500 px-10 text-white active:bg-gray-600">
          Search
        </button>
      </form>
    </div>
  );
}

export default DefinitionSearch;
