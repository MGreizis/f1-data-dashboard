const StandingsButton = ({ race, onShowStandings }) => {

  const handleClick = () => {
    onShowStandings(race)
  }

  return (
    <button onClick={handleClick} className="my-2 px-2 bg-amaranth hover:bg-coyote text-eggplant font-bold rounded">
      Standings
    </button>
  );
};

export default StandingsButton;