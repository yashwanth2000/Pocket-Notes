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
        <div className={styles.notes}>
          {notes.map((note, index) => (
            <div key={index}>
              <p className={styles.noteText}>{note.text}</p>
              <p className={styles.noteTimestamp}>{note.timestamp}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.noteInput}>
        <textarea
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Enter your text here..."
          rows={6}
          cols={100}
        />
        <div className={styles.arrowButton} onClick={handleArrowClick}>
          <img src={arrow} alt="arrow"/>
        </div>
      </div>
    </div>
  ) : null;
};

export default NotesArea;
