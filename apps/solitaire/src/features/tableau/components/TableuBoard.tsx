import Card from "../../../components/Card";
import _sample from 'lodash/sample';
import type { CardType } from "../../../types/card";
import React from "react";

const TableuBoard: React.FC = () => {
  const types: CardType[] = ['spades', 'hearts', 'diamonds', 'clubs'];
  // generate 7 columms, with column #1 having 1 card, column #2 having 2 cards, etc.
  const columns = [1, 2, 3, 4, 5, 6, 7].map((i) => ({
    cards: Array(i).fill({
      type: _sample(types) as CardType,
      value: _sample([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
    })
  }));
  console.log(columns);

  return (
    <div className="tableu p-8 mx-auto max-w-5xl grid grid-cols-7 gap-5">
      {columns.map((column) => (
        <div className="flex flex-col w-20">
          {column.cards.map((card, cardIndex) => (
            <div className="first:mt-0 -mt-24">
              <Card card={card} flipped={cardIndex !== column.cards.length - 1} />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default TableuBoard;