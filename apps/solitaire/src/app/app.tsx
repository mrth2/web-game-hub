import Header from "../features/header/components/Header"
import TableuBoard from "../features/tableau/components/TableuBoard"

function App() {
  return (
    <div className="bg-green-500 h-screen w-screen text-white flex flex-col">
      <Header />

      <div className="flex justify-between flex-1">
        <div className="w-20 bg-gray-700/50"></div>
        <div className="flex-1">
          <TableuBoard />
        </div>
        <div className="w-20 bg-gray-700/50"></div>
      </div>
    </div>
  )
}

export default App
