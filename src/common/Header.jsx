import { AppBar, Toolbar, Typography } from "@mui/material";
import { HeaderSelector } from "@/components/HeaderSelector";
import { AboutModalButton } from "@/components/AboutModalButton";
import { FavoritesModalButton } from "@/components/FavoritesModalButton";

const Header = ({ onYearChange, favs, setFavs }) => {
  return (
    <AppBar position="static">
      <Toolbar className="bg-auburn text-slate-200">
        <Typography variant="h6" component="p">
          Seasons
        </Typography>
        <HeaderSelector onYearChange={onYearChange} />

        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, textAlign: "center" }}
        >
          F1 Dashboard
        </Typography>

        <AboutModalButton />

        <FavoritesModalButton favs={favs} setFavs={setFavs} />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
