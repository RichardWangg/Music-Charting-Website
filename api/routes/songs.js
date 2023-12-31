import data from "../data";
import express from "express";

const songsRoute = express.Router()

songsRoute.get("/", (req, res) => res.json(data.songs))

songsRoute.get("/search/:query", (req, res) => {
    const searchQuery = req.params.query.replace(/\s/g, "").toLowerCase();

    const songs = data.songs.filter((album) => {
        const formattedAlbumName = album.name.replace(/\s/g, "").toLowerCase();
        const formattedAlbumArtist = album.artist.replace(/\s/g, "").toLowerCase();
        return (
            formattedAlbumName.includes(searchQuery) ||
            formattedAlbumArtist.includes(searchQuery)
        );
    });

    if (songs.length === 0) {
        return res.status(404).json({ error: "songs not found." });
    }

    return res.json(songs);
});

export default songsRoute