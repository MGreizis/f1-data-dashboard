import { useState } from 'react';

const ResultsButton = ({ race, onShowDetails, fetchRaceResults, fetchQualiTimes }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onShowDetails(race);
    await fetchQualiTimes(race.raceId);
    await fetchRaceResults(race.raceId);
    setLoading(false);
  };

  return (
    <button 
      onClick={handleClick}
      className={`my-2 px-2 mx-4 bg-amaranth hover:bg-coyote text-eggplant font-bold rounded ${loading ? 'opacity-50 cursor-not-allowed' : ""}`}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Results'}
    </button>
  );
};

export default ResultsButton;
