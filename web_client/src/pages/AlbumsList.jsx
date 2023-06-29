import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import NavBar from "../components/NavBar";

import { default as Logo } from "../assets/logo.svg";

import "./List.css";

const AlbumsList = () => {
  const [albums, setAlbums] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/albums")
      .then((response) => response.json())
      .then((data) => setAlbums(data));
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
      <div className="list">
        {results.length > 1
          ? results.map((album) => <ListItem key={album.id} {...album} />)
          : albums.map((album) => <ListItem key={album.id} {...album} />)}
        ;
      </div>
    </div>
  );
};

export default AlbumsList;
