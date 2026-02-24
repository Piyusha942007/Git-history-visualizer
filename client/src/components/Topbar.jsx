import PlaybackControls from "./PlaybackControls";
import Filters from "./Filters";

const Topbar = () => {
  return (
    <div className="topbar">
      <PlaybackControls />
      <Filters />
    </div>
  );
};

export default Topbar;