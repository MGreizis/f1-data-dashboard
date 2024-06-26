import { Modal } from "flowbite-react";
import { Typography } from "@mui/material";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

const CircuitModal = ({ show, close, circuitData, favs, setFavs, modalSize }) => {

  const addToFavs = () => {
    // check if favs has duplicates
    const isDuplicate = favs.some((favourite) => {
      if (favourite.type === "circuit") {
        return favourite.name === circuitData.name;
      }
      return false;
    });

    if (isDuplicate) {
      alert("Circuit already added to favorites");
      return;
    }

    const newFavorite = {
      name: circuitData.name,
      nationality: circuitData.nationality,
      url: circuitData.url,
      type: "circuit",
    };

    const updatedFavs = [...favs, newFavorite];
    setFavs(updatedFavs);
  };

  return (
    <Modal dismissible show={show} onClose={close} size={modalSize}>
      {circuitData && (
        <div className="flex bg-taupe rounded-md">
          <div className="w-1/2">
            <Modal.Body>
              <div>
                <Typography variant="h2" component="h2">
                  {circuitData.name}
                </Typography>

                <Typography variant="p" component="p">
                  Country: {circuitData.country}
                </Typography>

                <Typography variant="p" component="p">
                  Location: {circuitData.location}
                </Typography>

                <Typography variant="p" component="p">
                  <a href={circuitData.url} target="_blank" rel="noreferrer">
                    Wikipedia
                  </a>
                </Typography>

                <img
                  src={`https://placehold.co/300x200`}
                  alt="Constructor"
                  className="my-2"
                />
              </div>
            </Modal.Body>
          </div>

          <div className="w-1/2 p-4">
            <div className="flex justify-end">
              <button
                className="my-2 py-2 px-8 min-w-4 max-h-fit bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded"
                onClick={close}
              >
                Close
              </button>
            </div>
            <div className="flex justify-end">
              <button
                className="my-2 py-2 px-8 min-w-4 max-h-fit bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded"
                onClick={addToFavs}
              >
                Add to Favorites
              </button>
            </div>
            <div id="map">
              <MapContainer center={[circuitData.lat, circuitData.lng]} zoom={14} scrollWheelZoom={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[circuitData.lat, circuitData.lng]}>
                  <Popup>
                    {circuitData.location}
                  </Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CircuitModal;
