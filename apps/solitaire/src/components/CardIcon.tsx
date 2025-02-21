import { ClubIcon, DiamondIcon, HeartIcon, SpadeIcon } from "lucide-react";
import type { TCardType } from "../types/card";


type CardIconProps = {
  type: TCardType;
  size?: 'small' | 'large' | 'medium';
}
function CardIcon(props: CardIconProps) {
  let size: number;
  switch (props.size) {
    case 'large':
      size = 64;
      break;
    case 'medium':
      size = 56;
      break;
    default: // small
      size = 24;
  }
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