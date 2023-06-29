import { useEffect, useState } from "react";
import ListItem from "../components/ListItem";

import { default as Logo } from "../assets/logo.svg";

import "./List.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchAlbums } from "../actions/albumActions";

const AlbumsList = () => {
  const dispatch = useDispatch();
  const albums = useSelector((state) => state.albums.items);

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);

  const [results, setResults] = useState([]);
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    fetch(`http://localhost:4000/songs/search/${input}`)
      .then((response) => response.json())
      .then((data) => setResults(data));
  }, [input]);

  return (
    <div className="container">
      <div className="header">
        <h2>Top 50 Albums</h2>
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
          ? results.map((album) => <ListItem key={album.id} {...album} />)
          : albums.map((album) => <ListItem key={album.id} {...album} />)}
        ;
      </div>
    </div>
  );
};

export default AlbumsList;
