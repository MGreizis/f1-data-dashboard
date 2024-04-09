import { useState } from "react";
import { Button, Modal, Typography, Box, Grid } from "@mui/material";

export const FavoritesModalButton = (favs, setFavs) => {
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const handleFavoritesOpen = () => {
    setFavoritesOpen(true);
  };

  const handleFavoritesClose = () => {
    setFavoritesOpen(false);
  };

  const clearFavorites = () => {
    favs.setFavs([]);
  };

  return (
    <>
      <Button color="inherit" onClick={handleFavoritesOpen} sx={{ mx: 1 }}>
        Favorites
      </Button>
      <Modal open={favoritesOpen} onClose={handleFavoritesClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            bgcolor: "rgb(162,156,155)",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container justifyContent="space-between" alignItems="start">
            <Typography variant="h2" component="h2" gutterBottom>
              Favorites
            </Typography>
            <div>
              <button
                className="my-2 mx-2 py-2 px-8 bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded"
                onClick={clearFavorites}
              >
                Clear Favorites
              </button>
              <button
                className="my-2 mx-2 py-2 px-8 bg-slate-200 hover:bg-coyote text-eggplant font-bold rounded"
                onClick={handleFavoritesClose}
              >
                Close
              </button>
            </div>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Favorite Drivers
              </Typography>
              {favs.favs
                .filter((fav) => fav.type === "driver")
                .map((favorite, index) => (
                  <Typography
                    key={`driver-${index}`}
                    variant="body1"
                    gutterBottom
                  >
                    {favorite.forename} {favorite.surname}
                  </Typography>
                ))}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Favorite Constructors
              </Typography>
              {favs.favs
                .filter((fav) => fav.type === "constructor")
                .map((favorite, index) => (
                  <Typography
                    key={`constructor-${index}`}
                    variant="body1"
                    gutterBottom
                  >
                    {favorite.name}
                  </Typography>
                ))}
              {/* {favorites.map((favorite, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {favorite.constructorName}
                </Typography>
              ))} */}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Favorite Circuits
              </Typography>
              {favs.favs
                .filter((fav) => fav.type === "circuit")
                .map((favorite, index) => (
                  <Typography
                    key={`circuit-${index}`}
                    variant="body1"
                    gutterBottom
                  >
                    {favorite.name}
                  </Typography>
                ))}
              {/* {favorites.map((favorite, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {favorite.circuitName}
                </Typography>
              ))} */}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
