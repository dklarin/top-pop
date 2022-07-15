import React from "react";
import styles from "./Modal.module.css";
import { RiCloseLine } from "react-icons/ri";

const Modal = ({ setIsOpen, data }) => {
  var minutes;
  var seconds;

  const timeChange = () => {
    minutes = Math.floor(data.duration / 60);
    seconds = data.duration - minutes * 60;
  };

  timeChange();

  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Song selected</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <RiCloseLine style={{ marginBottom: "-3px" }} />
          </button>
          <div className={styles.modalContent}>
            <div>
              <b>Redni broj:</b> {data.position}
            </div>
            <div>
              <b>Naziv pjesme:</b> {data.title}
            </div>
            <div>
              <b>Izvođač:</b> {data.artist.name}
            </div>
            <div>
              <b>Trajanje:</b> {minutes + ":" + seconds}
            </div>
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button
                className={styles.deleteBtn}
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
