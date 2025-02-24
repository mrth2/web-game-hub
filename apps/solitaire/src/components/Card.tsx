import React from "react";
import type { TCard } from "../types/card";
import CardIcon from "./CardIcon";

type CardProps = {
  card: TCard;
  flipped?: boolean;
  draggable?: boolean;
}
const Card: React.FC<CardProps> = ({ card, flipped, draggable }) => {
  const canDrag = draggable ?? true;
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
      <div className="card bg-blue-500 border-6 border-white h-28 w-20 rounded-xl overflow-hidden">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {grids}
        </div>
      </div>
    );
  }

  const CardValue = () => {
    let value: string | number = card.value;
    if (card.value === 1) value = 'A';
    if (card.value === 11) value = 'J';
    if (card.value === 12) value = 'Q';
    if (card.value === 13) value = 'K';
    return (
      <span className="font-extrabold text-2xl">{value}</span>
    )
  }

  const CardImage = () => {
    if (card.value === 11) return <div className="text-7xl font-extrabold">J</div>
    if (card.value === 12) return <div className="text-7xl font-extrabold">Q</div>
    if (card.value === 13) return <div className="text-7xl font-extrabold">K</div>
    return <CardIcon type={card.type} size="large" />
  }
  return (
    <div className={`card rounded-xl bg-white h-28 w-20 p-1 flex flex-col justify-between shadow shadow-gray-400` + (card.type === 'hearts' || card.type === 'diamonds' ? ' text-red-600' : ' text-stone-700')} draggable={canDrag}>
      <div className="flex justify-between items-center">
        <CardValue />
        <CardIcon type={card.type} />
      </div>
      <div className="mb-2 mx-auto">
        <CardImage />
      </div>
    </div>
  )
}

export default Card;