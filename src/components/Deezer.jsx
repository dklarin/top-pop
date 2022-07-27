import React, { useState } from "react";
import styled from "styled-components";
import styles from "./Deezer.module.css";
import Modal from "./Modal";

const Table = styled.table`
  border: 2px solid #185adb;
  width: 800px;
  height: 200px;
  margin: auto;
`;

const Th = styled.th`
  border-bottom: 1px solid black;
`;

const Tr = styled.tr`
  text-align: left;
  &:hover,
  &:focus {
    color: #185adb;
  }
  &:active {
    color: red;
  }
  cursor: pointer;
`;

const Td = styled.td`
  text-align: left;
`;

export const Layout = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState();
  const [duration, setDuration] = useState(null);
  let newData = [...data];

  const rowSelect = (key) => {
    setTrack(data[key]);
  };

  const timeChange = (time) => {
    let minutes = Math.floor(time / 60);
    let seconds = time - minutes * 60;
    if (seconds < 10) {
      return minutes + ":0" + seconds;
    } else {
      return minutes + ":" + seconds;
    }
  };

  if (duration == null) {
    newData.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));
  } else if (duration === true) {
    newData.sort((a, b) => parseFloat(b.duration) - parseFloat(a.duration));
  } else {
    newData.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
  }

  return newData.length !== 0 ? (
    <div>
      <div style={{ marginTop: "2%" }}>
        <b>Top Pop app</b>
      </div>
      <div>
        <Table style={{ marginTop: "2%" }}>
          <thead>
            <tr>
              <Th>No.</Th>
              <Th>Artist</Th>
              <Th>Song</Th>
              <Th>Duration</Th>
            </tr>
          </thead>
          {newData.map((track, key) => {
            return (
              <tbody key={key} onClick={() => rowSelect(key)}>
                <Tr onClick={() => setIsOpen(true)}>
                  <Td>{track.position}</Td>
                  <Td>{track.artist.name}</Td>
                  <Td>{track.title}</Td>
                  <Td>{timeChange(track.duration)}</Td>
                </Tr>
              </tbody>
            );
          })}
        </Table>
      </div>
      <button
        className={styles.primaryBtn}
        onClick={() => setDuration(!duration)}
      >
        Sort Duration
      </button>
      <button className={styles.primaryBtn} onClick={() => setDuration(null)}>
        Reset
      </button>
      {isOpen && <Modal setIsOpen={setIsOpen} data={track} />}
    </div>
  ) : (
    <div>Loading...</div>
  );
};
