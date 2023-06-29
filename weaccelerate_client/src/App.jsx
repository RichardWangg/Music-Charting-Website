import "./App.css";
import songimg from "./assets/top50songs.png";
import albumimg from "./assets/top50albums.png";


function App() {
  return (
    <div className="App">
      <div className="App-body-container">
        <div className="App-card">
          <a href="/top50albums" className="App-link">
            <img src={albumimg} alt="albumchart" />
          </a>
        </div>
        <div className="App-card">
          <a href="/top50songs" className="App-link">
            <img src={songimg} alt="songchart" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;