import DriverStandings from './DriverStandings';
import ConstructorStandings from './ConstructorStandings';

const StandingsContainer = ({ raceId }) => {
  return (
    <div className="flex">
      <DriverStandings raceId={raceId} />
      <ConstructorStandings raceId={raceId} />
    </div>
  );
};

export default StandingsContainer;
