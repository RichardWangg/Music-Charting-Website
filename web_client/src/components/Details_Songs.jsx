import "./Details.css";
import { useEffect, useState } from "react";
import axios from "axios";

const Details = ({ name, artist, release_date }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [songId, setSongId] = useState('')
    const [lyrics, setLyrics] = useState([]);

    useEffect(() => {
        const loadSongId = async (id) => {
            //takes in the id from the rest api, and fetches song_id from graphql api
            //setSongId('whatever is the song id')
            setSongId('7CVdoY8cVBfCGvhWWIydUF');
        }

        loadSongId();
    }, [])

    const options = {
        method: 'GET',
        url: 'https://spotify-scraper.p.rapidapi.com/v1/track/lyrics',
        params: {
            trackId: `${songId}`
        },
        headers: {
            'X-RapidAPI-Key': '8fdc060475msh59dca9a6d7cef8cp109777jsn3485d134fba7',
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
                                <div className="modal-header">
                                    <button type="button" className="btn-close" onClick={handleCloseModal}> X </button>
                                </div>
                                <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                    {lyrics}
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
