const ResultsButton = ({ race, onShowDetails }) => {
  return (
    <button 
      onClick={() => onShowDetails(race)}
      className="my-2 px-2 mx-4 bg-peachyellow hover:bg-coyote text-eggplant font-bold rounded"
    >
      Results
    </button>
  );
};

export default ResultsButton;
