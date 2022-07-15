import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "./components/Deezer";



function App() {

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchTracksJSON() {
      const response = await fetch(
        "https://nameless-hollows-61775.herokuapp.com/https://api.deezer.com/chart"
      );
      const deezer = await response.json();
      return deezer;
    }

    fetchTracksJSON().then((deezer) => {
      setTracks(deezer.tracks.data);
    });
  }, []);

  return (
    <div className="App">
      <Layout data={tracks} />
    </div>
  );
}

export default App;
