import { useState, useEffect } from "react";
import ResultsButton from "./ResultsButton";
import StandingsButton from "./StandingsButton";
import DriverModal from "./DriverModal";
import ConstructorModal from "./ConstructorModal";
import CircuitModal from "./CircuitModal";
import StandingsContainer from "./StandingsContainer";
import RaceResultsSection from "./RaceResultsSection";
import QualifyingSection from "./QualifyingSection";
import RaceDetailsSection from "./RaceDetailsSection";
import supabase from "../api/supabase";

export const DashboardSections = ({ data, favs, setFavs }) => {
  const [selectedRace, setSelectedRace] = useState(null);
  const [showStandings, setShowStandings] = useState(false);
  const [showQualifying, setShowQualifying] = useState(false);
  const [showRaceResults, setShowRaceResults] = useState(false);
  const [raceResults, setRaceResults] = useState(null);
  const [qualifyingTimes, setQualifyingTimes] = useState(null);
  const [driverModalOpen, setDriverModalOpen] = useState(false);
  const [driverData, setDriverData] = useState(null);
  const [constructorModalOpen, setConstructorModalOpen] = useState(false);
  const [constructorData, setConstructorData] = useState(null);
  const [circuitModalOpen, setCircuitModalOpen] = useState(false);
  const [circuitData, setCircuitData] = useState(null);
  const [modalSize, setModalSize] = useState("md");
  const [driverStandings, setDriverStandings] = useState([]);
  const [constructorStandings, setConstructorStandings] = useState([]);

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
        setModalSize("4xl");
      }
    } catch (error) {
      console.error("Error fetching circuit details:", error.message);
    }
  };

  const handleShowStandings = async (race) => {
    setSelectedRace(race);
    setShowStandings(true);
    setShowQualifying(false);
    setShowRaceResults(false);

    try {
      const { data: driverStandingsData, error: driverStandingsError } = await supabase
        .from("driverStandings")
        .select(`
          drivers (driverRef, code, forename, surname), 
          races (name, round, year, date, raceId), 
          position, 
          points, 
          wins`
        )
        .lte("raceId", race.raceId)
        .order("position", { ascending: true });

      if (driverStandingsError) {
        console.error(
          "Error fetching driver standings:",
          driverStandingsError.message
        );
        return;
      }

      setDriverStandings(driverStandingsData);

      const { data: constructorStandingsData, error: constructorStandingsError } = await supabase
        .from("constructorStandings")
        .select(`
          constructors (constructorRef, name, nationality), 
          races (name, round, year, date, raceId), 
          position, 
          points, 
          wins`
        )
        .lte("raceId", race.raceId)
        .order("position", { ascending: true });

      if (constructorStandingsError) {
        console.error(
          "Error fetching constructor standings:",
          constructorStandingsError.message
        );
        return;
      }

      setConstructorStandings(constructorStandingsData);
    } catch (error) {
      console.error("Error fetching standings:", error.message);
    }
  };

  useEffect(() => {
    const raceId = 1100;
    const callFetchRaceResults = async () => {
      await fetchRaceResults(raceId);
    };

    callFetchRaceResults();

    const intervalId = setInterval(() => {
      callFetchRaceResults();
    }, 4 * 24 * 60 * 60 * 1000); // 4 days in milliseconds

    return () => clearInterval(intervalId);
  }, []);
  
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
    setShowQualifying(true);
    setShowRaceResults(true);
    setShowStandings(false);
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

                  <StandingsButton
                    race={race}
                    onShowStandings={handleShowStandings}
                  />
                </div>
              </div>
            ))}
        </div>
      </section>
      <section className="w-1/16">{/* Blank space */}</section>
      <section className="w-2/3 m-4">
        <RaceDetailsSection
          selectedRace={selectedRace}
          openCircuitModal={openCircuitModal}
        />
        <div className="flex min-h-screen bg-taupe rounded-md">
          {(showStandings || showQualifying || showRaceResults) && (
            <>
              <div className="w-full flex flex-row">
                {showQualifying && (
                  <QualifyingSection
                    qualifyingTimes={qualifyingTimes}
                    openDriverModal={openDriverModal}
                    openConstructorModal={openConstructorModal}
                  />
                )}
                {showRaceResults && (
                  <RaceResultsSection
                    raceResults={raceResults}
                    openDriverModal={openDriverModal}
                    openConstructorModal={openConstructorModal}
                  />
                )}
              </div>
              {showStandings && (
                <StandingsContainer
                  driverStandings={driverStandings}
                  constructorStandings={constructorStandings}
                  openDriverModal={openDriverModal}
                  openConstructorModal={openConstructorModal}
                  raceId={selectedRace.raceId}
                />
              )}
            </>
          )}
        </div>
      </section>
      <DriverModal
        show={driverModalOpen}
        close={closeDriverModal}
        driverData={driverData}
        favs={favs}
        setFavs={setFavs}
      />
      <ConstructorModal
        show={constructorModalOpen}
        close={closeConstructorModal}
        constructorData={constructorData}
        favs={favs}
        setFavs={setFavs}
      />
      <CircuitModal
        show={circuitModalOpen}
        close={closeCircuitModal}
        circuitData={circuitData}
        favs={favs}
        setFavs={setFavs}
        modalSize={modalSize}
      />
    </main>
  );
};
