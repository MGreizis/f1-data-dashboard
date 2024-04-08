import { useState } from "react";
import { Modal } from "flowbite-react";
import { Typography } from "@mui/material";

const ConstructorModal = ({ show, close, constructorData, favs, setFavs }) => {
  const addToFavs = () => {
    // check if favs has duplicates
    const isDuplicate = favs.some((favourite) => {
      if (favourite.type === "constructor") {
        return favourite.name === constructorData.name;
      }
      return false;
    });

    if (isDuplicate) {
      alert("Constructor already added to favorites");
      return;
    }

    const newFavorite = {
      name: constructorData.name,
      nationality: constructorData.nationality,
      url: constructorData.url,
      type: "constructor",
    };

    const updatedFavs = [...favs, newFavorite];
    setFavs(updatedFavs);
  };
// const ConstructorModal = ({ show, close, constructorData }) => {
//   const [favorites, setFavorites] = useState(
//     JSON.parse(localStorage.getItem("favorites")) || []
//   )

//   const handleAddToFavorites = () => {
//     const isDuplicate = favorites.some(
//       (favorite) => 
//         favorite.constructorName === constructorData.name
//     )

//     if (!isDuplicate) {
//       const newFavorite = {
//         constructorName: constructorData.name,
//         country: constructorData.nationality,
//         url: constructorData.url
//       };
  
//       const updatedFavorites = [...favorites, newFavorite];
//       setFavorites(updatedFavorites);
  
//       localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
//     } else {
//       alert("Element already added to favorites")
//     }
//   }

  return (
    <Modal dismissible show={show} onClose={close}>
      {constructorData && (
        <div className="flex bg-taupe rounded-md">
          <div className="w-2/3">
            <Modal.Body>
              <div>
                <Typography variant="h2" component="h2">
                  {constructorData.name}
                </Typography>

                <Typography variant="p" component="p">
                  Nationality: {constructorData.nationality}
                </Typography>

                <Typography variant="p" component="p">
                  <a
                    href={constructorData.url}
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
              onClick={addToFavs} 
            >
            {/* <button
              className="my-2 py-2 px-8 min-w-full bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded" 
              onClick={handleAddToFavorites}
            > */}
              Add to Favorites
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default ConstructorModal;
