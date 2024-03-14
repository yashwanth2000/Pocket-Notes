import { useState } from "react";
import styles from "./NotesArea.module.css";
import arrow from "../assets/arrow.png";

const NotesArea = ({ group, getGroupInitials }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");

  const handleArrowClick = () => {
    addNote();
  };
  const addNote = () => {
    if (newNote.trim()) {
      const currentDate = new Date();
      const timestamp = `${currentDate.toLocaleDateString()} • ${currentDate.toLocaleTimeString()}`;
      const newNoteObj = { text: newNote.trim(), timestamp };
      setNotes((prevNotes) => [...prevNotes, newNoteObj]);
      setNewNote("");
    }
  };

  return group ? (
    <div className={styles.noteContainer}>
      <div className={styles.noteHeader}>
        <div
          className={styles.groupCircle}
          style={{ backgroundColor: group.color }}
        >
          {getGroupInitials(group.name)}
        </div>
        <div className={styles.noteHeaderText}>{group.name}</div>
      </div>
      <div className={styles.noteBody}>
        {notes.map((note, index) => (
          <div key={index} className={styles.notes}>
            <p className={styles.noteText}>{note.text}</p>
            <h4 className={styles.noteTimestamp}>{note.timestamp}</h4>
          </div>
        ))}
      </div>
      <div className={styles.noteInput}>
        <div className={styles.inputWrapper}>
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Enter your text here..."
            rows={10}
            cols={130}
          />
          <img
            src={arrow}
            alt="arrow"
            onClick={handleArrowClick}
            className={styles.arrowIcon}
          />
        </div>
      </div>
    </div>
  ) : null;
};

export default NotesArea;
