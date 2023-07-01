import "./Details.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Details = ({ id, name, artist, release_date, cover_art_url }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [songId, setSongId] = useState('')
    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        const loadSongId = async (id) => {
            try {
                const response = await axios.get(`http://localhost:5000/graphql?query={song(id:${id}){song_id}}`);
                const { song_id } = response.data.data.song;
                setSongId(song_id);
            } catch (error) {
                console.error(error);
            }
        }

        loadSongId(id);
    }, []);

    const options = {
        method: 'GET',
        url: 'https://spotify-scraper.p.rapidapi.com/v1/track/lyrics',
        params: {
            trackId: `${songId}`
        },
        headers: {
            'X-RapidAPI-Key': 'dd09aefd22mshf682ee87fc9084cp1e83f5jsnba4dadbd5c19',
            'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
        }
    };

    const loadLyrics = async (songid) => {
        try {
            const response = await axios.request(options);
            const data = response.data.split('\n').map(line => line.replace(/^\[\d{2}:\d{2}\.\d{2}\]/, ''));
            console.log(data);
            setLyrics(data);
        } catch (error) {
            console.error(error);
        }
    }

    const handleOpenModal = () => {
        loadLyrics(songId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="details">
            <b>Title:</b> {name}
            <b>Artist:</b> {artist}
            <b>Released on:</b> {release_date}

            <button onClick={handleOpenModal}>View Lyrics</button>

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}>
                        <div className="modal-dialog modal-xl modal-dialog-centered">
                            <div className="modal-content">
                                <div className="modal-header" style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
                                    <button type="button" className="btn-close" onClick={handleCloseModal}> X </button>
                                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                        <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                                            <img src={cover_art_url} alt="cover art" />
                                        </div>
                                        <div style={{ alignSelf: "center", display: "flex", flexDirection: "column" }}>
                                            <div style={{ color: "white", fontWeight: "bold" }}>{name} </div>
                                            <div> {artist} </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-body" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                                    <div>
                                        {lyrics.map((line, index) => (
                                            <p key={index}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isModalOpen && <div className="modal-backdrop fade show" onClick={handleCloseModal}></div>}
        </div>

    );
};

export default Details;
