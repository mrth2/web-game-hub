import { observer } from "mobx-react-lite";
import { useCallback, useContext, useEffect, useState } from "react";
import { GameContext } from "../../../app/gameContext";
import Card from "../../../components/Card";
import { TCard } from "../../../types/card";
import { RotateCcwIcon } from "lucide-react";
import _shuffle from "lodash/shuffle";
import Button from "../../../components/Button";

const StockPile = observer(() => {
  const gameStore = useContext(GameContext);

  const [stockCards, setStockCards] = useState(gameStore.cardsInStock);
  const [openingCards, setOpeningCards] = useState<TCard[]>([]);

  const openCard = useCallback((card: TCard) => {
    if (stockCards.length > 0) {
      setStockCards((prev) => prev.filter((c) => c !== card)); // remove from stock list
      setOpeningCards((prev) => [...prev, card]); // add to opening list
    }
    gameStore.incrementMoves(); // add to moves
  }, [stockCards, openingCards]);

  const resetStock = useCallback(() => {
    gameStore.resetScore();
    setStockCards(_shuffle(gameStore.cardsInStock)); // shuffle stock cards
    setOpeningCards([]); // clear opening list
    gameStore.incrementMoves(); // add to moves
  }, [gameStore.cardsInStock]);

  const pickOpeningCard = useCallback((card: TCard) => {
    if (gameStore.autoPickCard(card)) {
      setOpeningCards((prev) => prev.filter((c) => c !== card)); // remove from opening list
    }
  }, [openingCards]);

  return (
    <>
      <div className="flex flex-col justify-center p-5">
        {stockCards.length === 0 && (
          <Button onClick={resetStock}>
            <div className="opacity-50 rounded-xl border-4 border-white h-28 w-20 flex justify-center items-center grayscale">
              <RotateCcwIcon size={64} />
            </div>
          </Button>
        )}
        {stockCards.length > 0 && stockCards.map(card => (
          <div className="first:mt-0 -mt-28 translate-y-0.5 cursor-pointer" key={card.type + card.value} onClick={() => openCard(card)}>
            <Card card={card} flipped />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center px-5 py-2">
        {/* show last 3 cards */}
        {openingCards.length > 0 && openingCards.slice(-3).map(card => (
          <div className="first:mt-0 -mt-20 cursor-move" key={card.type + card.value} onClick={() => pickOpeningCard(card)}>
            <Card card={card} flipped={false} />
          </div>
        ))}
      </div>
    </>
  )
});

export default StockPile;