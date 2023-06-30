import { useState } from "react";
import PropTypes from "prop-types";
import Details from "./Details_Albums";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import "./ListItem.css";

const ListItem = (props) => {
  const [details, setDetails] = useState(null);
  const [buttonState, setButtonState] = useState(false);

  function handleLoadDetails() {
    setDetails(props);
    setButtonState(!buttonState);
  }

  return (
    <div className="card">
      <h4>{props.name}</h4>
      <img src={props?.cover_art_url} alt={props?.name} />
      <button onClick={handleLoadDetails}>
        <b>See Details</b>
      </button>
      {details && buttonState ? <Details {...details} /> : null}
    </div>
  );
};

ListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default ListItem;
