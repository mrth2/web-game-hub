import { createContext, FC, ReactNode } from "react"
import { GameStore } from "../stores/game"

const gameStore = new GameStore();
export const GameContext = createContext<GameStore>(gameStore);

const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <GameContext.Provider value={gameStore}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider;