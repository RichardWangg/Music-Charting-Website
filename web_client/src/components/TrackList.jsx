import axios from 'axios';
import { useState, useEffect } from "react";
import TrackListItem from "./TrackListItem";
import './TrackList.css'

const TrackList = ({ albumid }) => {
    console.log(albumid)
    const [results, setResults] = useState(null)

    const options = {
        method: 'GET',
        url: 'https://spotify23.p.rapidapi.com/album_tracks/',
        params: {
            id: `${albumid}`, //REPLACE THIS WITH {} ALBUMID FROM YOUR FETCH TO GET ALBUMID IN DETAILS.JSX (the prop of this TrackList component)
            offset: '0',
            limit: '500'
        },
        headers: {
            'X-RapidAPI-Key': 'dd09aefd22mshf682ee87fc9084cp1e83f5jsnba4dadbd5c19',
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

export default TrackList;