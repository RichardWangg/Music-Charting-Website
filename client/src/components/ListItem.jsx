import React, { useState } from 'react'
import PropTypes from "prop-types";
import Details from './Details';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import { Link } from "react-router-dom";

const ListItem = (props) => {
    const [details, setDetails] = useState(null);

    function handleLoadDetails() {
        fetch(`api url here`)
            .then((response) => {
                response.json();
                if (response.status === 405) {
                    loadingError();
                    console.log("Error: information cannot be loaded");
                }
            })
            .then((data) => setDetails(data));
    }

    function loadingError() {
        toast.error("No Details Found", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }

    return (
        <section>
            <h3 key={props.id}>{props.name}</h3>
            <img src={props.cover_art_url} alt={props.name} />
            <button onClick={handleLoadDetails}>See Details</button>
            {details ? <Details {...details} /> : null}
        </section>
    )
}

ListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default ListItem