import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "lucide-react";
import type { CardType } from "../types/card";


type CardIconProps = {
  type: CardType;
  size?: 'default' | 'large';
}
function CardIcon(props: CardIconProps) {
  const size = props.size === 'large' ? 64 : 24;
  switch (props.type) {
    case 'hearts':
      return <HeartIcon size={size} className="text-red-600 fill-red-600" />;
    case 'diamonds':
      return <DiamondIcon size={size} className="text-red-600 fill-red-600" />;
    case 'clubs':
      return <ClubIcon size={size} className="text-stone-700 fill-stone-700" />;
    case 'spades':
      return <SpadeIcon size={size} className="text-stone-700 fill-stone-700" />;
  }
}

export default CardIcon;