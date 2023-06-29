import { useEffect, useState } from "react";
import axios from "axios";

import ListItem from "../components/ListItem";
import { default as Logo } from "../assets/logo.svg";

import "./List.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchSongs } from "../actions/songActions";

const SongsList = () => {
  const dispatch = useDispatch();
  const songs = useSelector((state) => state.songs.items);

  useEffect(() => {
    dispatch(fetchSongs());
  }, []);

  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchSongs());
  }, [input]);

  useEffect(() => {
    fetch(`http://localhost:4000/songs/search/${input}`)
      .then((response) => response.json())
      .then((data) => setResults(data));
  }, [input]);

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
