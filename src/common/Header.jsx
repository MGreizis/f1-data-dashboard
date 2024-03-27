import { AppBar, Toolbar, Typography } from "@mui/material";
import { HeaderSelector } from "@/components/HeaderSelector";
import { AboutModalButton } from "@/components/AboutModalButton";
import { FavoritesModalButton } from "@/components/FavoritesModalButton";

const Header = () => {
  return (
    <AppBar position="static">
      <Toolbar className="bg-eggplant text-buff">
        <Typography variant="h6" component="p">
          Seasons
        </Typography>
        <HeaderSelector />

        <Typography variant="h5" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
          App Title
        </Typography>

        <AboutModalButton />

        <FavoritesModalButton />
      </Toolbar>

    </AppBar>
  );
};

export default Header;
