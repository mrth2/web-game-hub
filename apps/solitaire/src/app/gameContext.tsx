import { createContext, FC, ReactNode } from "react"
import { GameStore } from "../stores/game"

export const GameContext = createContext<GameStore>({} as GameStore);

const GameProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <GameContext.Provider value={new GameStore()}>
      {children}
    </GameContext.Provider>
  )
}

export default GameProvider;