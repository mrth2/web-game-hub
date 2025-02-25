import { observer } from "mobx-react-lite";
import Card from "../../../components/Card";
import CardIcon from "../../../components/CardIcon";
import { FoundationStore } from "../../../stores/foundation";
import { useContext } from "react";
import { GameContext } from "../../../app/gameContext";

type FoundationPileProps = {
  foundation: FoundationStore;
}
const FoundationPile = observer(({ foundation }: FoundationPileProps) => {
  if (!foundation.topCard) {
    return (
      <div className="opacity-50 rounded-xl border-4 border-white h-28 w-20 flex justify-center items-center grayscale">
        <CardIcon type={foundation.type} size="medium" />
      </div>
    )
  }
  const gameStore = useContext(GameContext);
  const restoreCardFromFoundation = () => {
    const card = foundation.pickTopCard();
    if (!card) return;
    gameStore.autoMoveCardInTableu(card);
  }
  // display only the last card
  return (
    <div onClick={restoreCardFromFoundation}>
      <Card card={foundation.topCard} />
    </div>
  )
});

export default FoundationPile;