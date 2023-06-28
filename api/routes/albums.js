import data from "../data";
import express from "express";

const albumsRoute = express.Router()

albumsRoute.get("/", (req, res) => res.json(data.albums))

albumsRoute.get("/search/:query", (req, res) => {
    const searchQuery = req.params.query.replace(/\s/g, "").toLowerCase();

    const albums = data.albums.filter((album) => {
        const formattedAlbumName = album.name.replace(/\s/g, "").toLowerCase();
        const formattedAlbumArtist = album.artist.replace(/\s/g, "").toLowerCase();
        return (
            formattedAlbumName.includes(searchQuery) ||
            formattedAlbumArtist.includes(searchQuery)
        );
    });

    if (albums.length === 0) {
        return res.status(404).json({ error: "Albums not found." });
    }

    return res.json(albums);
});

export default albumsRoute