import { useState } from "react";
import ResultsButton from "./ResultsButton";
import StandingsButton from "./StandingsButton";
import { createClient } from "@supabase/supabase-js";

export const DashboardSections = ({ data }) => {
  const [selectedRace, setSelectedRace] = useState(null);
  const [raceResults, setRaceResults] = useState(null);
  const [qualifyingTimes, setQualifyingTimes] = useState(null);

  const handleShowQuali = (race) => {
    setSelectedRace(race);
  };

  const fetchRaceResults = async (raceId) => {
    try {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase
          .from("results")
          .select(
            `drivers (driverRef, code, forename, surname), races (name, round, year, date), constructors (name, constructorRef), positionText, points, laps`
          )
          .eq("raceId", raceId);

        if (error) {
          console.error("Error fetching race results:", error.message);
        } else {
          setRaceResults(data);
        }
      }
    } catch (error) {
      console.error("Error fetching race results:", error.message);
    }
  };

  const fetchQualiTimes = async (raceId) => {
    try {
      const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
      const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const supabase = createClient(supabaseUrl, supabaseAnonKey);

        const { data, error } = await supabase
          .from("qualifying")
          .select(
            `races (raceId, year, name, date, time), drivers (driverRef, forename, surname, number, code, nationality), q1, q2, q3, constructors (name), position`
          )
          .eq("raceId", raceId)
          .order("q3", { ascending: true });

        if (error) {
          console.error("Error fetching qualifying times:", error.message);
        } else {
          setQualifyingTimes(data);
        }
      }
    } catch (err) {
      console.error("Error fetching qualifying times:", err.message);
    }
  }

  return (
    <main className="flex flex-row">
      <section className="w-2/5 m-4">
        <div className="min-h-screen bg-taupe rounded-md">
        {/* !! Refactor into table */}
          <h2 className="font-bold text-eggplant p-2 mx-2">
            Rnd &#160; &#160; &#160; Circuit
          </h2>
          {data &&
            data.map((race, index) => (
              <div
                key={`${race.id}-${index}`}
                className="flex items-center justify-between"
              >
                {/* <div className="flex items-center space-x-4"> */}
                  <div className="flex items-center justify-center mx-4 font-bold">
                    {race.round}
                  </div>
                  <div>
                    <h2>{race.name}</h2>
                  </div>
                {/* </div> */}
                <div className="flex mr-2">
                  <ResultsButton
                    race={race}
                    onShowDetails={handleShowQuali}
                    fetchRaceResults={fetchRaceResults}
                    fetchQualiTimes={fetchQualiTimes}
                  />

                  <StandingsButton />
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="w-1/16">{/* Blank space */}</section>
      <section className="w-3/5 m-4">
        <div className="flex min-h-screen bg-taupe rounded-md">
          <div className="w-1/2 m-2">
            {selectedRace && (
              <div className="p-2">
                <h2>
                  {selectedRace.name}, Round {selectedRace.round},{" "}
                  {selectedRace.year}, <a href={selectedRace.circuits.url} target="_blank" rel="noopener noreferrer">{selectedRace.circuits.name}</a>, {" "}
                  {selectedRace.date}, <a href={selectedRace.url} target="_blank" rel="noopener noreferrer">Race Information</a>
                </h2>
              </div>
            )}
            <div className="w-1/2 m-2">
              {qualifyingTimes && (
                <>
                  <h2 className="text-center font-bold text-xl py-2">
                    Qualifying
                  </h2>
                  <table className="text-center mx-2">
                    <thead>
                      <tr>
                        <th className="px-2">Pos</th>
                        <th className="px-2">Driver</th>
                        <th>Constructor</th>
                        <th>Q1</th>
                        <th>Q2</th>
                        <th>Q3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {qualifyingTimes.map((qualifying, index) => (
                        <tr key={index}>
                          <td>{qualifying.position}</td>
                          <td 
                            key={index} 
                            className={index < 3 ? "font-bold py-3" : "py-3"}
                          >
                            {qualifying.drivers.forename} {qualifying.drivers.surname}
                          </td>
                          <td>{qualifying.constructors.name}</td>
                          <td>{qualifying.q1}</td>
                          <td className="px-2">{qualifying.q2}</td>
                          <td className="px-2 pr-3">{qualifying.q3}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          </div>
          <div className="w-1/2 m-2">
            {raceResults && (
              <>
                <h2 className="text-center font-bold text-xl py-2">
                  Results
                </h2>
                <table className="text-center mx-2">
                  <thead>
                    <tr>
                      <th className="px-2">Pos</th>
                      <th>Driver</th>
                      <th className="px-2">Constructor</th>
                      <th className="px-2">Laps</th>
                      <th className="px-2">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {raceResults.map((result, index) => (
                      <tr 
                        key={index} 
                        className={index < 3 ? "bg-wenge text-white my-2 divide-y divide-coyote" : "divide-y divide-coyote"}
                      >
                        <td key={`${index}-pos`} className={index < 3 ? "font-bold" : ""}>   
                          {result.positionText}
                        </td>
                        <td 
                          key={index} 
                          className={index < 3 ? "font-bold py-3" : "py-3"}
                        >
                          {result.drivers.forename} {result.drivers.surname}
                        </td>
                        <td>{result.constructors.name}</td>
                        <td>{result.laps}</td>
                        <td>{result.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};
