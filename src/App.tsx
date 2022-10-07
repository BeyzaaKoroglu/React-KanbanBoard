import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useLoginContext } from "./contexts/LoginContext/LoginContext";
import HomePage from "./pages/HomePage";
import { BoardProvider } from "./contexts/BoardContext/BoardContext";
import BoardPage from "./pages/BoardPage";

function App() {
  const { isLoggedIn } = useLoginContext();

  return (
    <div className="App">
      {!isLoggedIn ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      ) : (
        <BoardProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/boards" element={<HomePage />} />
              <Route path="/board/:id" element={<BoardPage />} />
            </Routes>
          </BrowserRouter>
        </BoardProvider>
      )}
    </div>
  );
}

export default App;
