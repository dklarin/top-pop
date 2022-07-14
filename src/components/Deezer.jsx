import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "./App.module.css";
import Modal from "./Modal";

const Table = styled.table`
  border: 2px solid forestgreen;
  width: 800px;
  height: 200px;
`;

const Th = styled.th`
  border-bottom: 1px solid black;
`;

const Td = styled.td`
  text-align: left;
`;

export const Layout = () => {
  const [tracks, setTracks] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState();
  const [sort, setSort] = useState(false);

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

  const rowSelect = (key) => {
    console.log(tracks[key].artist);
    setTrack(tracks[key]);
    //setModal(false);
  };

  function GetSortOrder(prop) {
    return function (a, b) {
      if (a[prop] > b[prop]) {
        return 1;
      } else if (a[prop] < b[prop]) {
        return -1;
      }
      return 0;
    };
  }

  ///tracks.sort(GetSortOrder("duration"));
  /*tracks.sort(function (a, b) {
    return parseFloat(a.duration) - parseFloat(b.duration);
  });*/

  //tracks.sort((a, b) => b.id - a.id);
  sort
    ? tracks.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration))
    : // tracks.sort(GetSortOrder("duration"));

      tracks.sort((a, b) => parseFloat(b.duration) - parseFloat(a.duration));

  return (
    <div>
      <button className={styles.primaryBtn} onClick={() => setSort(!sort)}>
        Open Modal
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} data={track} />}
      <Table>
        <thead>
          <tr>
            <Th>Redni broj</Th>
            <Th>Izvođač</Th>
            <Th>Pjesma</Th>
            <Th>Trajanje</Th>
          </tr>
        </thead>
        {tracks.map((track, key) => {
          return (
            <tbody key={key} onClick={() => rowSelect(key)}>
              <tr onClick={() => setIsOpen(true)}>
                <Td>{track.position}</Td>
                <Td>{track.artist.name}</Td>
                <Td>{track.title}</Td>
                <Td>{track.duration}</Td>
              </tr>
            </tbody>
          );
        })}
      </Table>
    </div>
  );
};
