import { useContext, useState } from "react";
import { zeroish } from "../../../utils/zeroish";
import { GhostButton } from "../../../components/Button";
import { CrownIcon, Volume2Icon, VolumeOffIcon } from "lucide-react";
import { observer } from "mobx-react-lite";
import { GameContext } from "../../../app/gameContext";

const Header = observer(() => {
  const gameStore = useContext(GameContext);
  const [mute, setMute] = useState(false);

  const hour = zeroish(Math.floor(gameStore.timer / 3600));
  const minute = zeroish(Math.floor(gameStore.timer / 60));
  const second = zeroish(gameStore.timer % 60);
  const displayTime = hour + ":" + minute + ":" + second;

  return (
    <div className="header bg-gray-700 flex justify-between items-center gap-5 p-4 h-20">
      {/* logo */}
      <div className="flex items-center gap-2">
        <CrownIcon size={32} />
        <h1 className="uppercase">Solitaire</h1>
      </div>
      {/* game runtime information */}
      <div className="flex justify-center items-center flex-1 gap-5 md:gap-8 lg:gap-10">
        {/* timing */}
        <p>{displayTime}</p>
        {/* current score */}
        <p>
          <span className="text-gray-400 mr-2">Score:</span>
          <span>{gameStore.score}</span>
        </p>
        {/* moves made */}
        <p>
          <span className="text-gray-400 mr-2">Moves:</span>
          <span>{gameStore.moves}</span>
        </p>
      </div>
      {/* actions */}
      <div className="flex justify-end items-center">
        <GhostButton onClick={() => setMute(!mute)}>
          {mute ? (
            <VolumeOffIcon />
          ) : (
            // unmuted icon
            <Volume2Icon />
          )}
        </GhostButton>
      </div>
    </div >
  );
});

export default Header;