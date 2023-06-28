import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";
import Search from "../components/Search";

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

  return (
    <div className="container">
      <div className="header">
        <h2>Top 50 Albums</h2>
        <img className="logo" src={Logo} alt="logo" />
        <div className="search-bar">
          <Search results={results} setResults={setResults} />
        </div>
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
