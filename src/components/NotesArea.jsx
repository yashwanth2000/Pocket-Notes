import { useState } from "react";
import styles from "./NotesArea.module.css";
import arrow from "../assets/arrow.png";

const NotesArea = ({ group }) => {
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
        <div className={styles.noteHeaderText}>{group.name}</div>
      </div>
      <div className={styles.noteBody}>
        {notes.map((note, index) => (
          <div key={index}>
            <p className={styles.noteText}>{note.text}</p>
            <p className={styles.noteTimestamp}>{note.timestamp}</p>
          </div>
        ))}
      </div>
      <div className={styles.noteInput}>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your text here..."
          rows={10}
          cols={150}
        />
        <div className={styles.arrowButton} onClick={handleArrowClick}>
          <img src={arrow} alt="arrow" />
        </div>
      </div>
    </div>
  ) : null;
};

export default NotesArea;
