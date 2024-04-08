import { useState } from "react";
import ResultsButton from "./ResultsButton";
import StandingsButton from "./StandingsButton";
import { createClient } from "@supabase/supabase-js";
import DriverModal from "./DriverModal";
import ConstructorModal from "./ConstructorModal";
import CircuitModal from "./CircuitModal";

// !! PLEASE REMEMBER TO REFACTOR THIS INTO COMPONENTS
export const DashboardSections = ({ data }) => {
  const [selectedRace, setSelectedRace] = useState(null);
  const [raceResults, setRaceResults] = useState(null);
  const [qualifyingTimes, setQualifyingTimes] = useState(null);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [constructorModalOpen, setConstructorModalOpen] = useState(false);
  const [constructorData, setConstructorData] = useState(null);
  const [circuitModalOpen, setCircuitModalOpen] = useState(false);
  const [circuitData, setCircuitData] = useState(null);

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
  const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const fetchRaceResults = async (raceId) => {
    try {
      const { data, error } = await supabase
        .from("results")
        .select(
          `drivers (driverRef, code, forename, surname, driverId), races (name, round, year, date), constructors (name, constructorRef, constructorId), positionText, points, laps`
        )
        .eq("raceId", raceId);

      if (error) {
        console.error("Error fetching race results:", error.message);
      } else {
        setRaceResults(data);
      }
    } catch (error) {
      console.error("Error fetching race results:", error.message);
    }
  };

  const fetchQualiTimes = async (raceId) => {
    try {
      const { data, error } = await supabase
        .from("qualifying")
        .select(
          `races (raceId, year, name, date, time), drivers (driverRef, forename, surname, number, code, nationality, driverId), q1, q2, q3, constructors (name, constructorId), position`
        )
        .eq("raceId", raceId)
        .order("q3", { ascending: true });

      if (error) {
        console.error("Error fetching qualifying times:", error.message);
      } else {
        setQualifyingTimes(data);
      }
    } catch (err) {
      console.error("Error fetching qualifying times:", err.message);
    }
  };

  const openDriverModal = async (driverId) => {
    try {
      const { data, error } = await supabase
        .from("drivers")
        .select("forename, surname, dob, nationality, url")
        .eq("driverId", driverId)
        .single();

      if (error) {
        throw error;
      } else {
        setDriverData(data);
        setDriverModalOpen(true);
        console.log("Driver data:", data);
      }
    } catch (error) {
      console.error("Error fetching driver details:", error.message);
    }
  };

  const openConstructorModal = async (constructorId) => {
    try {
      const { data, error } = await supabase
        .from("constructors")
        .select("name, nationality, url")
        .eq("constructorId", constructorId)
        .single();

      if (error) {
        throw error;
      } else {
        setConstructorData(data);
        setConstructorModalOpen(true);
        console.log("Driver data:", data);
      }
    } catch (error) {
      console.error("Error fetching constructor details:", error.message);
    }
  };

  const openCircuitModal = async (circuitId) => {
    try {
      const { data, error } = await supabase
        .from("circuits")
        .select("name, url, location, country, lat, lng")
        .eq("circuitId", circuitId)
        .single();

        if (error) {
          throw error;
        } else {
          setCircuitData(data);
          setCircuitModalOpen(true);
          console.log("Circuit data:", data);
        }
    } catch (error) {
      console.error("Error fetching circuit details:", error.message);
    }
  }

  const closeDriverModal = () => {
    setDriverData(null);
    setDriverModalOpen(false);
  };

  const closeConstructorModal = () => {
    setConstructorData(null);
    setConstructorModalOpen(false);
  };

  const closeCircuitModal = () => {
    setCircuitData(null);
    setCircuitModalOpen(false);
  };

  const handleShowQuali = (race) => {
    setSelectedRace(race);
  };

  return (
    <main className="flex flex-row">
      <section className="w-1/3 m-4">
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
                <div className="flex items-center justify-center mx-4 font-bold">
                  {race.round}
                </div>
                <div>
                  <h2>{race.name}</h2>
                </div>
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
      <section className="w-2/3 m-4">
        <div className="flex min-h-screen bg-taupe rounded-md">
          <div className="w-1/2 m-2">
            {selectedRace && (
              <div className="p-2">
                <h2>
                  {selectedRace.year}, Round {selectedRace.round},{" "}
                  {selectedRace.name},{" "}
                  <a
                    onClick={() => openCircuitModal(selectedRace.circuits.circuitId)}
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
            <div className="m-2">
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
                            {qualifying.drivers.forename}{" "}
                            {qualifying.drivers.surname}
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
          </div>
          <div className="w-1/2 m-2">
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
        </div>
      </section>
      <DriverModal
        show={driverModalOpen}
        close={closeDriverModal}
        driverData={driverData}
      />
      <ConstructorModal
        show={constructorModalOpen}
        close={closeConstructorModal}
        constructorData={constructorData}
      />
      <CircuitModal
        show={circuitModalOpen}
        close={closeCircuitModal}
        circuitData={circuitData}
      />
    </main>
  );
};
