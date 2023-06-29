import PropTypes from "prop-types";
import axios from 'axios';
import { useState, useEffect } from "react";
import TrackListItem from "./TrackListItem";
import './TrackList.css'

const TrackList = (props) => {
    const [results, setResults] = useState(null)

    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/album_tracks/',
        params: {
            id: '151w1FgRZfnKZA9FEcg9Z3', //REPLACE THIS WITH {} ALBUMID FROM YOUR FETCH TO GET ALBUMID IN DETAILS.JSX (the prop of this TrackList component)
            offset: '0',
            limit: '300'
        },
        headers: {
            'X-RapidAPI-Key': '8fdc060475msh59dca9a6d7cef8cp109777jsn3485d134fba7',
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios(options);
                const tracks = response.data.data.album.tracks.items.map((item) => ({
                    uri: item.track.uri.replace('spotify:track:', ''),
                    name: item.track.name,
                    totalMilliseconds: item.track.duration.totalMilliseconds
                }));
                console.log(tracks)
                setResults(tracks);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []);

    return (
        <section>
            {results ? results.map((song, index) => (
                <TrackListItem
                    key={index}
                    uri={song.uri}
                    name={song.name}
                    totalMilliseconds={song.totalMilliseconds}
                />
            )) : null}
        </section>
    )
}

TrackList.propTypes = {
    id: PropTypes.number.isRequired
};

export default TrackList;