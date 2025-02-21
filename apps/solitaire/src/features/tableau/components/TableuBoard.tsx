import Card from "../../../components/Card";
import type { TCard } from "../../../types/card";
import { useContext } from "react";
import { GameContext } from "../../../app/gameContext";
import { observer } from "mobx-react-lite";

const TableuBoard = observer(() => {
  const gameStore = useContext(GameContext);

  const onPickCard = (card: TCard) => {
    // try to place the card in the foundation
    gameStore.moveCardToFoundation(card) ||
      // if the card is not placed in the foundation, try move the card in the tableu
      gameStore.autoMoveCardInTableu(card);
  };

  return (
    <div className="tableu p-8 mx-auto max-w-5xl grid grid-cols-7 gap-5">
      {gameStore.tableuColumns.length && gameStore.tableuColumns.map((cards, colIndex) => (
        <div key={colIndex} className="flex flex-col w-20">
          {cards.map((card) => (
            <div key={card.type + card.value} className="first:mt-0 -mt-20 cursor-move" onClick={() => onPickCard(card)}>
              <Card card={card} flipped={!card.revealed} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
})

export default TableuBoard;