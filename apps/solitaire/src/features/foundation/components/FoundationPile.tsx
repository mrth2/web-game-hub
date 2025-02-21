import { observer } from "mobx-react-lite";
import Card from "../../../components/Card";
import CardIcon from "../../../components/CardIcon";
import { FoundationStore } from "../../../stores/foundation";

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
  // display only the last card
  return (
    <Card card={foundation.topCard} />
  )
});

export default FoundationPile;