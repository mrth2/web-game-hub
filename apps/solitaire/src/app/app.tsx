import Foundation from "../features/foundation/components/Foundation"
import Header from "../features/header/components/Header"
import StockPile from "../features/stock/components/StockPile"
import TableuBoard from "../features/tableau/components/TableuBoard"
import GameProvider from "./gameContext"

export default function App() {
  return (
    <GameProvider>
      <div className="bg-green-500 h-screen w-screen text-white flex flex-col">
        <Header />

        <div className="flex justify-between flex-1">
          <div className="w-28 bg-gray-700/50">
            <StockPile />
          </div>
          <div className="flex-1">
            <TableuBoard />
          </div>
          <div className="w-28 bg-gray-700/50">
            <Foundation />
          </div>
        </div>
      </div>
    </GameProvider>
  )
}
