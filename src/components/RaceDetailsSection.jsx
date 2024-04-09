const RaceDetailsSection = ({ selectedRace, openCircuitModal }) => {
  return (
    <div>
      {selectedRace && (
        <div className="p-2">
          <h2>
            {selectedRace.year}, Round {selectedRace.round},{" "}
            {selectedRace.name},{" "}
            <a
              onClick={() =>
                openCircuitModal(selectedRace.circuits.circuitId)
              }
              className="cursor-pointer"
            >
              {selectedRace.circuits.name}
            </a>
            , {selectedRace.date},{" "}
            <a
              href={selectedRace.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Race Information
            </a>
          </h2>
        </div>
      )}
    </div>
  );
};

export default RaceDetailsSection;
