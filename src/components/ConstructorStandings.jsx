import { useEffect, useState } from 'react';
import { createClient } from "@supabase/supabase-js";

const ConstructorStandings = ({ raceId }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchConstructorStandings = async () => {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      try {
        const { data, error } = await supabase
          .from("constructorStandings")
          .select(`
            constructors (constructorRef, name, nationality), 
            races (name, round, year, date), 
            position, 
            points, 
            wins
          `)
          .eq("raceId", raceId)
          .order('position', { ascending: true });

        if (error) {
          console.error("Error fetching constructor standings:", error.message);
          return;
        }

        if (!data || data.length === 0) {
          console.error("Constructor standings not found for the specified race");
          return;
        }

        setStandings(data);
      } catch (err) {
        console.error("Error fetching constructor standings:", err.message);
      }
    };

    fetchConstructorStandings();
  }, [raceId]);

  return (
    <div>
      <h2 className="text-xl font-bold text-eggplant text-center my-4">
        Constructor Standings
      </h2>
      <div className="flex flex-col items-center justify-center">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-center">Pos</th>
              <th className="text-center">Constructor</th>
              <th className="text-center">Points</th>
              <th className="text-center">Wins</th>
            </tr>
          </thead>
          <tbody>
            {standings.map((standing) => (
              <tr key={standing.constructorId}>
                <td className="text-center">{standing.position}</td>
                <td className="text-center">
                  {standing.constructors.name} ({standing.constructors.nationality})
                </td>
                <td className="text-center">{standing.points}</td>
                <td className="text-center">{standing.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConstructorStandings;
