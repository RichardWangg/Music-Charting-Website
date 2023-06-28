import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import albumsRoute from "./routes/albums.js";
import songsRoute from "./routes/songs.js";

const app = express()
const { PORT = 4000 } = process.env;

app.listen(PORT, () =>
    console.log(`Hello World, I'm listening on port ${PORT}!`)
);

app.use(bodyParser.json()).use(cors());

app.use('/albums', albumsRoute)
app.use('/songs', songsRoute)
