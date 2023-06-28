import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Search.css";

const Search = ({ results, setResults }) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `http://localhost:4000/albums/search/${input}`
      );
      setResults(res.data);
      console.log(results);
    };
    fetch();
  }, [input]);

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className="form-container">
      <div>
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          placeholder="Search"
          type="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;
