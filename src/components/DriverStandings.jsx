import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const DriverStandings = ({ raceId, openDriverModal }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchDriverStandings = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      try {
        const { data, error } = await supabase
          .from("driverStandings")
          .select(
            `
            drivers (driverRef, code, forename, surname, driverId), 
            races (name, round, year, date), 
            position, 
            points, 
            wins
          `
          )
          .eq("raceId", raceId)
          .order("position", { ascending: true });

        if (error) {
          console.error("Error fetching driver standings:", error.message);
          return;
        }

        if (!data || data.length === 0) {
          console.error("Driver standings not found for the specified race");
          return;
        }

        setStandings(data);
      } catch (err) {
        console.error("Error fetching driver standings:", err.message);
      }
    };

    fetchDriverStandings();
  }, [raceId]);

  return (
    <div className="px-4">
      <h2 className="text-xl font-bold text-eggplant text-center my-4">
        Driver Standings
      </h2>
      <table className="text-center mx-2 my-2">
        <thead>
          <tr>
            <th className="px-2">Pos</th>
            <th className="px-2">Driver</th>
            <th className="px-2">Points</th>
            <th className="px-2">Wins</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing, index) => (
            <tr 
              key={index}
              className="my-2 divide-y divide-coyote"
            >
              <td>{standing.position}</td>
              <td 
                className="py-3 hover:underline hover:cursor-pointer"
                onClick={() => openDriverModal(standing.drivers.driverId)}
              >
                {standing.drivers.forename} {standing.drivers.surname}
              </td>
              <td>{standing.points}</td>
              <td>{standing.wins}</td>
              <td>{standing.drivers.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandings;
