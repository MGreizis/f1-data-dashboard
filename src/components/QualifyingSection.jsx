const QualifyingSection = ({ qualifyingTimes, openDriverModal, openConstructorModal }) => {
  return (
    <div className="w-1/2 m-2" id="qualifying-results">
      {qualifyingTimes && (
        <>
          <h2 className="text-center font-bold text-xl py-2">Qualifying</h2>
          <table className="text-center mx-2">
            <thead>
              <tr>
                <th className="px-2">Pos</th>
                <th className="px-2">Driver</th>
                <th className="px-2">Constructor</th>
                <th>Q1</th>
                <th>Q2</th>
                <th>Q3</th>
              </tr>
            </thead>
            <tbody>
              {qualifyingTimes.map((qualifying, index) => (
                <tr
                  key={`${index}-${qualifying.position}-${qualifying.drivers.driverId}`}
                >
                  <td>{qualifying.position}</td>
                  <td
                    key={`${index}-${qualifying.drivers.driverId}-${qualifying.drivers.forename}`}
                    className={
                      index < 3
                        ? "font-bold py-2 hover:underline hover:cursor-pointer"
                        : "py-2 hover:underline hover:cursor-pointer"
                    }
                    onClick={() =>
                      openDriverModal(qualifying.drivers.driverId)
                    }
                  >
                    {qualifying.drivers.forename} {qualifying.drivers.surname}
                  </td>
                  <td
                    key={`${index}-${qualifying.constructors.constructorId}`}
                    className={
                      index < 3
                        ? "font-bold py-2 hover:underline hover:cursor-pointer"
                        : "py-2 hover:underline hover:cursor-pointer"
                    }
                    onClick={() =>
                      openConstructorModal(
                        qualifying.constructors.constructorId
                      )
                    }
                  >
                    {qualifying.constructors.name}
                  </td>
                  <td className="px-2">{qualifying.q1}</td>
                  <td className="px-1">{qualifying.q2}</td>
                  <td className="px-2">{qualifying.q3}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default QualifyingSection;
