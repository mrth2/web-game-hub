import { observer } from 'mobx-react-lite';
import { useContext } from 'react';
import { GameContext } from '../../../app/gameContext';
import FoundationPile from './FoundationPile';

const Foundation = observer(() => {
  const gameStore = useContext(GameContext);

  return (
    <div className="flex flex-col gap-4 items-center p-4">
      <FoundationPile foundation={gameStore.heartFoundation} />
      <FoundationPile foundation={gameStore.diamondFoundation} />
      <FoundationPile foundation={gameStore.clubFoundation} />
      <FoundationPile foundation={gameStore.spadeFoundation} />
    </div>
  )
})

export default Foundation;