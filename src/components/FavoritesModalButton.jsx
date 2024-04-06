import { useState, useEffect } from "react";
import { Button, Modal, Typography, Box, Grid } from "@mui/material";

export const FavoritesModalButton = () => {
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [favoritesCleared, setFavoritesCleared] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [favorites])

  const handleFavoritesOpen = () => {
    setFavoritesOpen(true);
  };

  const handleFavoritesClose = () => {
    setFavoritesOpen(false);
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    // localStorage.clear();
    setFavorites([]);
    setFavoritesCleared(!favoritesCleared);
    setFavoritesOpen(false);
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
              {favorites.map((favorite, index) => (
                <Typography key={index} variant="body1" gutterBottom>
                  {favorite.forename} {favorite.surname}
                </Typography>
              ))}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Favorite Constructors
              </Typography>
              {/* Map over favorite constructors similarly */}
            </Grid>
            <Grid item xs={4}>
              <Typography variant="h5" gutterBottom>
                Favorite Circuits
              </Typography>
              {/* Map over favorite circuits similarly */}
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};
