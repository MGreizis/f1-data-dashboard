import { Select, MenuItem } from "@mui/material";
import { useState } from "react";

export const HeaderSelector = ({ onYearChange }) => {
  const [selectedYear, setSelectedYear] = useState(2023);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
    onYearChange(year);
  };

  return (
    <Select
      value={selectedYear}
      onChange={handleYearChange}
      variant="standard"
      displayEmpty
      sx={{ minWidth: 120, marginRight: "auto", marginLeft: 2, color: "white"}}
    >
      {Array.from({ length: 24 }, (_, i) => 2000 + i).map((year) => (
        <MenuItem key={year} value={year}>
          {year}
        </MenuItem>
      ))}
    </Select>
  );
};
