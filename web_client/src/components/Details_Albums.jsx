import "./Details.css";
import TrackList from "./TrackList";
import { useEffect, useState } from "react";


const Details = ({ id, name, artist, release_date, cover_art_url }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [albumId, setAlbumId] = useState('')

  useEffect(() => {
    const loadAlbumId = async () => {
      const query = `
        query GetAlbumId($id: Int!) {
          album(id: $id) {
            album_id
          }
        }
      `;

      const variables = {
        id: parseInt(id),
      };

      try {
        const response = await fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query, variables }),
        });

        const data = await response.json();
        const albumId = data.data.album.album_id;
        setAlbumId(albumId);
      } catch (error) {
        console.error("Error fetching album id:", error);
      }
    };

    loadAlbumId();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="details">
      <b>Title:</b> {name}
      <b>Artist:</b> {artist}
      <b>Released on:</b> {release_date}

      <button onClick={handleOpenModal}>Full TrackList</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className={`modal ${isModalOpen ? 'show' : ''}`} style={{ display: isModalOpen ? 'block' : 'none' }}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header" style={{ display: "flex", flexDirection: "column", alignItems: "left" }}>
                  <button type="button" className="btn-close" onClick={handleCloseModal}> X </button>
                  <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <div style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                      <img src={cover_art_url} alt="cover art" />
                    </div>
                    <div style={{ alignSelf: "center", display: "flex", flexDirection: "column" }}>
                      <div style={{ color: "white", fontWeight: "bold" }}>{name} </div>
                      <div> {artist} </div>
                    </div>
                  </div>
                </div>
                <div className="modal-body" style={{ maxHeight: '30vh', overflowY: 'auto' }}>
                  <TrackList albumid={albumId.toString()} />
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
