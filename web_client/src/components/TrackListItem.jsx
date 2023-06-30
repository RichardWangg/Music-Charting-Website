import PropTypes from "prop-types";
import { useState } from "react";
import axios from 'axios';
import './TrackList.css'

const TrackListItem = (props) => {
    const [lyrics, setLyrics] = useState([]);
    const [showLyrics, setShowLyrics] = useState(false);
    const [buttonState, setButtonState] = useState(false);

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

    const handleClick = () => {
        loadLyrics(songid);
        setShowLyrics(true);
        setButtonState(!buttonState)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex" }}>
                <div style={{ color: "white", width: "80%" }}>{props.name}</div>
                <div> {convertMilliseconds(props.totalMilliseconds)} </div>
            </div>
            <button onClick={handleClick} style={{ width: "20%" }}> Show/Hide Lyrics </button>
            {showLyrics && buttonState ?
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