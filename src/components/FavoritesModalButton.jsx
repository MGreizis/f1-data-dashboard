import { useState } from "react";
import { Button, Modal, Typography, Box } from "@mui/material";

export const FavoritesModalButton = () => {
  const [favoritesOpen, setFavoritesOpen] = useState(false);

  const handleFavoritesOpen = () => {
    const favoritesExist = false;
    if (favoritesExist) {
      setFavoritesOpen(true);
    }
  };

  const handleFavoritesClose = () => {
    setFavoritesOpen(false);
  };

  return (
    <>
      <Button color="inherit" onClick={handleFavoritesOpen}>
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
          <Typography variant="h6" component="h2" gutterBottom>
            Favorites
          </Typography>
          <Typography variant="body1" gutterBottom>
            Content specific to your applications favorites functionality.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
