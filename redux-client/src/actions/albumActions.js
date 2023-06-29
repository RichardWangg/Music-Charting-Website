import { FETCH_ALBUMS } from "./types";

export const fetchAlbums = () => (dispatch) => {
  return fetch("http://localhost:4000/albums")
    .then((res) => res.json())
    .then((albums) =>
      dispatch({
        type: FETCH_ALBUMS,
        data: albums,
      })
    );
};
