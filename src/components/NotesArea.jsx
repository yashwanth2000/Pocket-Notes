import { useState, useEffect } from "react";
import styles from "./NotesArea.module.css";
import arrow from "../assets/arrow.png";
import arrow2 from "../assets/arrow2.png";

const NotesArea = ({ group, getGroupInitials }) => {
  const [allNotes, setAllNotes] = useState({});
  const [newNote, setNewNote] = useState("");
  const [isTextPresent, setIsTextPresent] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setAllNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleArrowClick = () => {
    if (newNote.trim()) {
      const currentDate = new Date();
      const timestamp = `${currentDate.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })} • ${currentDate.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`;
      const newNoteObj = { text: newNote.trim(), timestamp };
      const updatedNotes = {
        ...allNotes,
        [group.name]: [...(allNotes[group.name] || []), newNoteObj],
      };
      setAllNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setNewNote("");
      setIsTextPresent(false);
    }
  };

  const groupNotes = allNotes[group.name] || [];

  return (
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
      <div className={styles.noteBodyContainer}>
        <div className={styles.noteBody}>
          {groupNotes.map((note, index) => (
            <div key={index} className={styles.notes}>
              <p className={styles.noteText}>{note.text}</p>
              <h4 className={styles.noteTimestamp}>{note.timestamp}</h4>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.noteInput}>
        <div className={styles.inputWrapper}>
          <textarea
            value={newNote}
            onChange={(e) => {
              setNewNote(e.target.value);
              setIsTextPresent(e.target.value.trim().length > 0);
            }}
            placeholder="Enter your text here..."
            rows={10}
            cols={130}
          />
          <img
            src={isTextPresent ? arrow2 : arrow}
            alt="arrow"
            onClick={handleArrowClick}
            className={styles.arrowIcon}
          />
        </div>
      </div>
    </div>
  );
};

export default NotesArea;
