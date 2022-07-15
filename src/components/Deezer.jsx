import React, { useState } from "react";
import styled from "styled-components";
import styles from "./App.module.css";
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

const Td = styled.td`
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

export const Layout = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [track, setTrack] = useState();
  const [duration, setDuration] = useState(null);

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
    data.sort((a, b) => parseFloat(a.position) - parseFloat(b.position));
  } else if (duration === true) {
    data.sort((a, b) => parseFloat(b.duration) - parseFloat(a.duration));
  } else {
    data.sort((a, b) => parseFloat(a.duration) - parseFloat(b.duration));
  }

  return (
    <div>
      <div className="font-face-gm" style={{ marginTop: "2%" }}>
        Top Pop app
      </div>
      <div>
        <Table style={{ marginTop: "2%" }}>
          <thead>
            <tr>
              <Th>Redni broj</Th>
              <Th>Izvođač</Th>
              <Th>Pjesma</Th>
              <Th>Trajanje</Th>
            </tr>
          </thead>
          {data.map((track, key) => {
            return (
              <tbody key={key} onClick={() => rowSelect(key)}>
                <tr onClick={() => setIsOpen(true)}>
                  <Td>{track.position}</Td>
                  <Td>{track.artist.name}</Td>
                  <Td>{track.title}</Td>
                  <Td>{timeChange(track.duration)}</Td>
                </tr>
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
  );
};
