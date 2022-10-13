import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../components/BoardHeader";
import BoardMembers from "../components/BoardMembers";
import Lists from "../components/Lists";
import { useBoardContext } from "../contexts/BoardContext/BoardContext";
import { CardProvider } from "../contexts/CardContext/CardContext";
import { ListProvider } from "../contexts/ListContext/ListContext";

const BoardPage = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const { setSelectedBoard, boards } = useBoardContext();

  const [open, setOpen] = useState<boolean>(false);
  const handleOpenModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    if (id) setSelectedBoard(Number(id.slice(1)));
  }, [boards]);

  const handleChangePage = () => {
    navigate("/");
  };

  return (
    <ListProvider>
      <CardProvider>
        <div>
          <BoardHeader
            onOpenModel={handleOpenModel}
            onChangePage={handleChangePage}
          />
          <BoardMembers open={open} onClose={handleClose} />
          <Lists />
        </div>
      </CardProvider>
    </ListProvider>
  );
};

export default BoardPage;
