import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { card } from "../../services/endpoints/card";
import { useListContext } from "../ListContext/ListContext";
import { ChecklistType, ContextType, NewValues, StateType } from "./types";

const initialState: StateType = {
  selectedCard: {
    id: -1,
    title: "",
    listId: -1,
    updatedAt: "",
    createdAt: "",
    description: "",
    duedate: undefined,
    checklists: [],
  },
};

export const CardContext = createContext<ContextType>({
  state: initialState,
  setSelectedCard: () => {},
  updateSelectedCard: () => {},
  addChecklist: () => {},
  deleteChecklist: () => {},
  updateChecklist: () => {},
});

export const CardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<StateType>(initialState);
  const { updateCard } = useListContext();

  useEffect(() => {
    updateCard(state.selectedCard);
  }, [state]);

  const setSelectedCard = (id: number) => {
    card.getById(id).then(({ data }) => {
      setState({ selectedCard: data });
    });
  };

  const updateSelectedCard = (newValues: NewValues) => {
    setState({
      selectedCard: {
        ...state.selectedCard,
        title: newValues.title,
        description: newValues.description,
        duedate: newValues.duedate,
      },
    });
  };

  const addChecklist = (newChecklist: ChecklistType) => {
    const checklists = [...state.selectedCard.checklists];
    checklists.push(newChecklist);
    setState({
      selectedCard: { ...state.selectedCard, checklists: checklists },
    });
  };

  const deleteChecklist = (checklistId: number) => {
    let checklists = [...state.selectedCard.checklists];
    checklists = checklists.filter((checklist) => checklist.id !== checklistId);
    setState({
      selectedCard: { ...state.selectedCard, checklists: checklists },
    });
  };

  const updateChecklist = (newChecklist: ChecklistType) => {
    let checklists = [...state.selectedCard.checklists];
    checklists = checklists.map((checklist) => {
      if (checklist.id === newChecklist.id) return newChecklist;
      return checklist;
    });
    setState({
      selectedCard: { ...state.selectedCard, checklists: checklists },
    });
  };

  const values = {
    state,
    setSelectedCard,
    updateSelectedCard,
    addChecklist,
    deleteChecklist,
    updateChecklist,
  };

  return <CardContext.Provider value={values}>{children}</CardContext.Provider>;
};

export const useCardContext = () => {
  const {
    state,
    setSelectedCard,
    updateSelectedCard,
    addChecklist,
    deleteChecklist,
    updateChecklist,
  } = useContext(CardContext);
  return {
    selectedCard: state.selectedCard,
    setSelectedCard,
    updateSelectedCard,
    addChecklist,
    deleteChecklist,
    updateChecklist,
  };
};
