import { useEffect, useState } from "react";
import axios from "axios";

import ListItem from "../components/ListItem";
import Search from "../components/Search";
import { default as Logo } from "../assets/logo.svg";

import "./List.css";
import "../components/Search.css";

const SongsList = () => {
  const [songs, setSongs] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/songs")
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, []);

  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetch(`http://localhost:4000/songs/search/${input}`)
      .then((response) => response.json())
      .then((data) => setResults(data));
  }, [input]);
  console.log(input);
  console.log(results);

  return (
    <div className="container">
      <div className="header">
        <h2>Top 50 Songs</h2>
        <img className="logo" src={Logo} alt="logo" />
        <div className="search-bar">
          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="form-container"
          >
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
        </div>
      </div>
      <div className="list">
        {results.length > 1
          ? results.map((song) => <ListItem key={song.id} {...song} />)
          : songs.map((song) => <ListItem key={song.id} {...song} />)}
      </div>
    </div>
  );
};

export default SongsList;
