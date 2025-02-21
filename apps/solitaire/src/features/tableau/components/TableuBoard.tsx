import Card from "../../../components/Card";
import type { TCard } from "../../../types/card";
import { useContext } from "react";
import { GameContext } from "../../../app/gameContext";
import { observer } from "mobx-react-lite";

const TableuBoard = observer(() => {
  const gameStore = useContext(GameContext);

  const onPickCard = (card: TCard) => {
    // place the card in the foundation
    gameStore.moveCardToFoundation(card);
  };

  return (
    <div className="tableu p-8 mx-auto max-w-5xl grid grid-cols-7 gap-5">
      {gameStore.tableuColumns.map((column) => (
        <div key={JSON.stringify(column)} className="flex flex-col w-20">
          {column.cards.map((card, cardIndex) => (
            <div key={cardIndex} className="first:mt-0 -mt-24 cursor-move" onClick={() => onPickCard(card)}>
              <Card card={card} flipped={cardIndex !== column.cards.length - 1} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})

export default TableuBoard;