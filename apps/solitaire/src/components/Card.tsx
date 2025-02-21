import React from "react";
import type { Card } from "../types/card";
import CardIcon from "./CardIcon";

type CardProps = {
  card: Card;
  flipped?: boolean;
}
const Card: React.FC<CardProps> = ({ card, flipped }) => {
  const isFlipped = flipped ?? false;
  if (isFlipped) {
    let even = false;
    const grids = Array(64).fill(null).map((_, i) => {
      let background = even ? 'var(--color-blue-400)' : 'var(--color-blue-500)';
      even = !even;
      if (i % 8 === 7) even = !even; // flip even on row end
      return (
        <div key={i} style={{ background }} />
      );
    });

    return (
      <div className="card bg-blue-500 border-6 border-white h-32 w-20 rounded-xl overflow-hidden">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {grids}
        </div>
      </div>
    );
  }

  const CardImage = () => {
    if (card.value === 1) return <div className="text-7xl font-extrabold">A</div>
    if (card.value === 11) return <div className="text-7xl font-extrabold">J</div>
    if (card.value === 12) return <div className="text-7xl font-extrabold">Q</div>
    if (card.value === 13) return <div className="text-7xl font-extrabold">K</div>
    return <CardIcon type={card.type} size="large" />
  }
  return (
    <div className={`card rounded-xl bg-white h-28 w-20 p-1 flex flex-col justify-between` + (card.type === 'hearts' || card.type === 'diamonds' ? ' text-red-600' : ' text-stone-700')}>
      <div className="flex justify-between items-center">
        <span className="font-extrabold text-2xl">{card.value}</span>
        <CardIcon type={card.type} />
      </div>
      <div className="mb-2 mx-auto">
        <CardImage />
      </div>
    </div>
  )
}

export default Card;