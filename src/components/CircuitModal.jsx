import { useState } from "react";
import { Modal } from "flowbite-react";
import { Typography } from "@mui/material";

const CircuitModal = ({ show, close, circuitData }) => {
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem("favorites")) || []
  )

  const handleAddToFavorites = () => {
    const isDuplicate = favorites.some(
      (favorite) => 
        favorite.circuitName === circuitData.name
    )

    if (!isDuplicate) {
      const newFavorite = {
        circuitName: circuitData.name,
        location: circuitData.location,
        country: circuitData.country,
        url: circuitData.url
      };
  
      const updatedFavorites = [...favorites, newFavorite];
      setFavorites(updatedFavorites);
  
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    } else {
      alert("Element already added to favorites")
    }
  }

  return (
    <Modal dismissible show={show} onClose={close}>
      {circuitData && (
        <div className="flex bg-taupe rounded-md">
          <div className="w-2/3">
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
                  <a
                    href={circuitData.url}
                    target="_blank"
                    rel="noreferrer"
                  >
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

          <div className="w-1/3 p-4">
            <button
              className="my-2 py-2 px-8 min-w-full bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded"
              onClick={close}
            >
              Close
            </button>
            <button
              className="my-2 py-2 px-8 min-w-full bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded"
              onClick={handleAddToFavorites}
            >
              Add to Favorites
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CircuitModal;