import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";

const DriverStandings = ({ raceId }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchDriverStandings = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      try {
        const { data, error } = await supabase
          .from("driverStandings")
          .select(`
            drivers (driverRef, code, forename, surname), 
            races (name, round, year, date), 
            position, 
            points, 
            wins
          `)
          .eq("raceId", raceId)
          .order('position', { ascending: true });

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
    <div>
      <h2>Driver Standings</h2>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Points</th>
            <th>Wins</th>
            <th>Driver</th>
            <th>Constructor</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((standing) => (
            <tr key={standing.driverRef}>
              <td>{standing.position}</td>
              <td>{standing.points}</td>
              <td>{standing.wins}</td>
              <td>{standing.drivers.forename} {standing.drivers.surname}</td>
              <td>{standing.drivers.nationality}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverStandings;
