import React, { useEffect, useState } from "react";
import "./App.css";
import { Layout } from "./components/Deezer";



function App() {

  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchMoviesJSON() {
      const response = await fetch(
        "https://nameless-hollows-61775.herokuapp.com/https://api.deezer.com/chart"
      );
      const deezer = await response.json();
      return deezer;
    }

    fetchMoviesJSON().then((deezer) => {
      setTracks(deezer.tracks.data);
    });
  }, []);

  const columns = [
    {
      Header: "First Name",
      accessor: "title",
    },
    {
      Header: "Last Name",
      accessor: "link",
    },
  ];



  return (
    <div className="App">
      <Layout data={tracks} columns={columns} />
    </div>
  );
}

export default App;
