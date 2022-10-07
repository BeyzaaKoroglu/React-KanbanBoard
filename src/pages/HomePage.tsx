import { useNavigate } from "react-router-dom";
import BoardList from "../components/BoardList";
import Header from "../components/Header";
import { useBoardContext } from "../contexts/BoardContext/BoardContext";
import { board } from "../services/endpoints/board";

const HomePage = () => {
  const { addBoard } = useBoardContext();
  const navigate = useNavigate();

  const handleAddBoard = () => {
    board.create({ title: "untitled Board" }).then(({ data }) => {
      addBoard(data);
      navigate(`/board/:${data.id}`);
    });
  };
  return (
    <div>
      <Header />
      <BoardList onAddBoard={handleAddBoard} />
    </div>
  );
};

export default HomePage;
