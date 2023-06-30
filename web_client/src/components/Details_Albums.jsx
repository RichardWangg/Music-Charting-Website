import "./Details.css";
import TrackList from "./TrackList";
import { useEffect, useState } from "react";


const Details = ({ name, artist, release_date }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albumId, setAlbumId] = useState('')

  useEffect(() => {
    const loadAlbumId = async (id) => {
      //use id from rest api to fetch albumid from graphql api
      setAlbumId('whatever the album id is');
    }
  }, [])

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="details">
      {name} by {artist}
      <b style={{ display: "inline" }}>Released: </b> {release_date}

      <button onClick={handleOpenModal}>Full TrackList</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="btn-close" onClick={handleCloseModal}> X </button>
                </div>
                <div className="modal-body" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                  <TrackList id="151w1FgRZfnKZA9FEcg9Z3" />
                  {/* <TrackList id={albumId} /> */}
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
