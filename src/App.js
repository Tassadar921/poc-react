import './App.css';
import Popular from "./components/Popular";
import Favorite from "./components/Favorites";
import Search from "./components/Search";
import Dexie from "dexie";

// Initialize the database outside the component to avoid reinitialization on every render
const db = new Dexie('POC');
db.version(1).stores({
    comments: '++id, tmdb_id, title, content',
});

function App() {
    return (
        <div className="App">
            <Search db={db} />
            <Popular db={db} />
            <Favorite db={db}/>
        </div>
    );
}

export default App;
