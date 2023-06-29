import { useEffect, useState } from "react";
import AlbumsListItem from "./AlbumsListItem";
import { useNavigate } from 'react-router-dom';

import './AlbumsList.css';

const AlbumsList = () => {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch("api/url/here") // 
            .then((response) => response.json())
            .then((data) => setAlbums(data));
    }, []);

    const navigate = useNavigate();

    function openPage() {
        navigate("/top50albums")
    }

    return (
        <div className="list">
            <h2>Top 50 Albums</h2>
            <hr />
            {albums?.map((album) => (
                <AlbumsListItem
                    key={album.id}
                    id={album.id}
                    name={album.name}
                    artist={album.artist}
                    release={album.release}
                    cover_art_url={album.cover_art_url}
                />
            ))}
        </div>
    );
}

export default AlbumsList;