import { FETCH_SONGS } from "./types";

export const fetchSongs = () => (dispatch) => {
  return fetch("http://localhost:4000/songs")
    .then((res) => res.json())
    .then((songs) =>
      dispatch({
        type: FETCH_SONGS,
        data: songs,
      })
    );
};
