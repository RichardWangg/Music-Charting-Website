import songimg from "../assets/top50songs.png";
import albumimg from "../assets/top50albums.png";
import { Link } from "react-router-dom";

import '../App.css';

function Home() {
    return (
        <div className="App">
            <div className="App-body-container">
                <div className="App-card">
                    <Link to="/albums" className="App-link">
                        <img src={albumimg} alt="albumchart" />
                    </Link>
                </div>
                <div className="App-card">
                    <Link to="/songs" className="App-link">
                        <img src={songimg} alt="songchart" />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Home;
