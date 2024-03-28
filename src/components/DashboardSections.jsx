import { useState } from "react";
import ResultsButton from "./ResultsButton";
import StandingsButton from "./StandingsButton";

export const DashboardSections = ({ data }) => {
  const [selectedRace, setSelectedRace] = useState(null);

  const handleShowResults = (race) => {
    setSelectedRace(race);
  };

  return (
    <div className="flex flex-row">
      <div className="w-2/5 m-4">
        <div className="min-h-screen bg-buff text-eggplant">
          <h2 className="font-bold text-eggplant p-2 mx-2">
            Rnd &#160; &#160; &#160; Circuit
          </h2>
          {data && data.map((race, index) => (
            <div
              key={`${race.id}-${index}`}
              className="flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center mx-4 font-bold">
                  {race.round}
                </div>
                <div>
                  <h2>{race.name}</h2>
                </div>
              </div>
              <div className="flex mr-2">
                <ResultsButton race={race} onShowDetails={handleShowResults}/>

                <StandingsButton />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/16">
        {/* Blank space */}
      </div>
      <div className="w-3/5 m-4">
        <div className="min-h-screen bg-buff">
          <h2 className="text-center font-bold text-eggplant text-xl py-2">Results</h2>
          {selectedRace && (
            <div className="p-2">
              <h2>{selectedRace.name}, Round {selectedRace.round}, {selectedRace.year}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
