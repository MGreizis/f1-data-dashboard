const RaceResultsSection = ({ raceResults, openDriverModal, openConstructorModal }) => {
  return (
    <div className="w-1/2 m-2" id="race-results">
      {raceResults && (
        <>
          <h2 className="text-center font-bold text-xl py-2">Results</h2>
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
                  key={`${index}-${result.races.round}-${result.races.name}`}
                  className={
                    index < 3
                      ? "bg-wenge text-white my-2 divide-y divide-coyote"
                      : "divide-y divide-coyote"
                  }
                >
                  <td
                    key={`${index}-pos`}
                    className={index < 3 ? "font-bold" : ""}
                  >
                    {result.positionText}
                  </td>
                  <td
                    key={`${index}-${result.drivers.driverId}-${result.drivers.forename}`}
                    className={
                      index < 3
                        ? "font-bold py-3 hover:underline hover:cursor-pointer"
                        : "py-3 hover:underline hover:cursor-pointer"
                    }
                    onClick={() =>
                      openDriverModal(result.drivers.driverId)
                    }
                  >
                    {result.drivers.forename} {result.drivers.surname}
                  </td>
                  <td
                    key={`${index}-${result.constructors.constructorId}`}
                    className={
                      index < 3
                        ? "font-bold py-3 hover:underline hover:cursor-pointer"
                        : "py-3 hover:underline hover:cursor-pointer"
                    }
                    onClick={() =>
                      openConstructorModal(
                        result.constructors.constructorId
                      )
                    }
                  >
                    {result.constructors.name}
                  </td>
                  <td>{result.laps}</td>
                  <td>{result.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default RaceResultsSection;
