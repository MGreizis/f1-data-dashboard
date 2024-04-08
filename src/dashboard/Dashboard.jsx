import Header from "../common/Header";
import { createClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { DashboardSections } from "@/components/DashboardSections";

export const Dashboard = () => {
  const [data, setData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const fetchRaceData = async () => {
        const { data, error } = await supabase
          .from("races")
          .select(`raceId, year, circuits (name, url, circuitId), date, round, url, name`)
          .eq("year", selectedYear)
          .order("date", { ascending: true });

        if (error) {
          console.error("Error fetching data:", error.message);
        } else {
          setData(data);
        }
      };

      fetchRaceData();
    }
  }, [selectedYear]);

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  return (
    <>
      <Header onYearChange={handleYearChange} favs={favs} setFavs={setFavs} />

      <DashboardSections data={data} favs={favs} setFavs={setFavs} />
    </>
  );
};
