import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../components/BoardHeader";
import { useBoardContext } from "../contexts/BoardContext/BoardContext";

const BoardPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedBoard, selectedBoard, boards } = useBoardContext();
  useEffect(() => {
    if (id) setSelectedBoard(Number(id.slice(1)));
  }, [boards]);

  const handleChangePage = () => {
    navigate("/");
  };

  return (
    <div>
      {selectedBoard && <BoardHeader onChangePage={handleChangePage} />}
    </div>
  );
};

export default BoardPage;
