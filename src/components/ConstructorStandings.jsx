import { useEffect, useState } from 'react';
import supabase from '../api/supabase';

const ConstructorStandings = ({ raceId, openConstructorModal }) => {
  const [standings, setStandings] = useState([]);

  useEffect(() => {
    const fetchConstructorStandings = async () => {
      try {
        const { data, error } = await supabase
          .from("constructorStandings")
          .select(`
            constructors (constructorRef, name, nationality, constructorId), 
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
        console.log(data)
      } catch (err) {
        console.error("Error fetching constructor standings:", err.message);
      }
    };

    fetchConstructorStandings();
  }, [raceId]);

  return (
    <div className="px-4">
      <h2 className="text-xl font-bold text-eggplant text-center my-4">
        Constructor Standings
      </h2>
      <div className="flex flex-col items-center justify-center">
        <table className="text-center mx-2 my-2">
          <thead>
            <tr>
              <th className="px-2">Pos</th>
              <th className="px-2">Constructor</th>
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
                <td className="">{standing.position}</td>
                <td 
                  key={index}
                  className="py-3 hover:underline hover:cursor-pointer"
                  onClick={() => openConstructorModal(standing.constructors.constructorId)}
                >
                  {standing.constructors.name} ({standing.constructors.nationality})
                </td>
                <td className="">{standing.points}</td>
                <td className="">{standing.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConstructorStandings;
