import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BoardHeader from "../components/BoardHeader";
import BoardMembers from "../components/BoardMembers";
import { useBoardContext } from "../contexts/BoardContext/BoardContext";

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
    <div>
      <BoardHeader
        onOpenModel={handleOpenModel}
        onChangePage={handleChangePage}
      />
      <BoardMembers open={open} onClose={handleClose} />
    </div>
  );
};

export default BoardPage;
