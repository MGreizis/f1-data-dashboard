import { useState } from "react";
import { Button, Modal, Typography, Box, useTheme } from "@mui/material";
import { GitHub } from "@mui/icons-material";

export const AboutModalButton = () => {
  const theme = useTheme();
  const [aboutOpen, setAboutOpen] = useState(false);

  const handleAboutOpen = () => {
    setAboutOpen(true);
  };

  const handleAboutClose = () => {
    setAboutOpen(false);
  };

  return (
    <>
      <Button color="inherit" onClick={handleAboutOpen} sx={{mx: 1}}>
        About
      </Button>
      <Modal open={aboutOpen} onClose={handleAboutClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" gutterBottom>
            About
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            A project to display Formula 1 data. Users can select a specific race to see the qualifying times
            and results for that race. Users can also add drivers, constructors and circuits to their favorites.
          </Typography>
          <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
            Built with React, Material UI, Tailwind CSS, and Supabase
          </Typography>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            By: Mārtiņš Greizis
          </Typography>
          <Button
            variant="outlined"
            startIcon={<GitHub />}
            href="https://github.com/MGreizis/f1-data-dashboard"
            target="_blank"
            sx={{
              mt: 2,
              backgroundColor: theme.palette.grey[300],
              color: "black",
              borderColor: "black",
              hover: { backgroundColor: theme.palette.grey[500] },
            }}
          >
            GitHub Repo
          </Button>
        </Box>
      </Modal>
    </>
  );
};
