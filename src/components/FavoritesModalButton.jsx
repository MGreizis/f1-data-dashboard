import { useState } from "react";
import { Button, Modal, Typography, Box } from "@mui/material";

export const FavoritesModalButton = () => {
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  const handleFavoritesOpen = () => {
    setFavoritesOpen(true);
  };

  const handleFavoritesClose = () => {
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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h2" component="h2" gutterBottom>
            Favorites
          </Typography>
          {favorites.map((favorite, index) => (
            <Typography key={index} variant="body1" gutterBottom>
              {favorite.forename} {favorite.surname}
            </Typography>
          ))}
        </Box>
      </Modal>
    </>
  );
};
