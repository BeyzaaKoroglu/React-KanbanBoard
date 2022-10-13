import { useCardContext } from "../../contexts/CardContext/CardContext";
import ChecklistItem from "../ChecklistItem";

const CheckLists = () => {
  const { selectedCard } = useCardContext();
  return (
    <div>
      {selectedCard.checklists.map((checklist) => (
        <ChecklistItem key={checklist.id} checklist={checklist} />
      ))}
    </div>
  );
};

export default CheckLists;
