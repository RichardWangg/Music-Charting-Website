import PropTypes from "prop-types";
import { useState } from "react";
import axios from 'axios';
import './TrackList.css'

const TrackListItem = (props) => {
    const [lyrics, setLyrics] = useState([]);
    const [showLyrics, setShowLyrics] = useState(false)

    const convertUri = (uri) => uri.replace('spotify:track:', '');

    const songid = convertUri(props.uri);

    const convertMilliseconds = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const secondsFormatted = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${secondsFormatted}`;
    }

    const options = {
        method: 'GET',
        url: 'https://spotify-scraper.p.rapidapi.com/v1/track/lyrics',
        params: {
            trackId: `${songid}`
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

    const handleShowLyrics = () => {
        loadLyrics(songid);
        setShowLyrics(true);
    }

    return (
        <div>
            {props.name}
            {convertMilliseconds(props.totalMilliseconds)}
            <button onClick={handleShowLyrics}> Show/Hide Lyrics </button>
            {showLyrics ?
                <div className="lyrics">
                    {lyrics.map((line, index) => (
                        <p key={index}>{line}</p>
                    ))}
                </div>
                : null}
        </div>
    )


}

TrackListItem.propTypes = {
    uri: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    totalMilliseconds: PropTypes.number.isRequired
};

export default TrackListItem