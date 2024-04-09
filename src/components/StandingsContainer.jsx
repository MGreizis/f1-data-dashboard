import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';

const StandingsContainer = ({ raceId, openDriverModal, openConstructorModal }) => {
  return (
    <div className="flex justify-between min-w-full">
      <DriverStandings raceId={raceId} openDriverModal={openDriverModal} />
      <ConstructorStandings raceId={raceId} openConstructorModal={openConstructorModal} />
    </div>
  );
};

export default StandingsContainer;
