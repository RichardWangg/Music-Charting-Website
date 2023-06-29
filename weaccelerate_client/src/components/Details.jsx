import "./Details.css";

/* eslint-disable react/prop-types */
const Details = ({ name, artist, release_date }) => {
  return (
    <div className="details">
      <b>Title:</b> {name}
      <b>Artist:</b> {artist}
      <b>Released on</b> {release_date}
    </div>
  );
};

export default Details;
