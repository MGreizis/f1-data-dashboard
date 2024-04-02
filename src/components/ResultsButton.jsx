import { useState } from 'react';

const ResultsButton = ({ race, onShowDetails, fetchRaceResults }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    await onShowDetails(race);
    await fetchRaceResults(race.raceId);
    setLoading(false);
  };

  return (
    <button 
      onClick={handleClick}
      className={`my-2 px-2 mx-4 bg-peachyellow hover:bg-coyote text-eggplant font-bold rounded ${loading ? 'opacity-50 cursor-not-allowed' : ""}`}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Results'}
    </button>
  );
};

export default ResultsButton;
