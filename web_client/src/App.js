import "./App.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AlbumsList from "./pages/AlbumsList.jsx";
import SongsList from "./pages/SongsList.jsx";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/albums" element={<AlbumsList />} />
      <Route path="/songs" element={<SongsList />} />
    </Routes>
  );
}

export default App;
