import { useState, useEffect, useCallback } from "react";
import styles from "./NotesArea.module.css";
import arrow from "../assets/arrow.png";
import arrow2 from "../assets/arrow2.png";
import backBtn from "../assets/backBtn.png";

const NotesArea = ({
  group,
  getGroupInitials,
  setSelectedGroup,
  isSmallScreen,
}) => {
  console.log("Rendering NotesArea component");
  const [allNotes, setAllNotes] = useState({});
  const [newNote, setNewNote] = useState("");
  const [inputNote, setInputNote] = useState(""); 
  const [isTextPresent, setIsTextPresent] = useState(false);
  const [editNoteId, setEditNoteId] = useState(null);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setAllNotes(JSON.parse(savedNotes));
    }
  }, []);

  const handleArrowClick = useCallback(() => {
    if (inputNote.trim()) {
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
      const newNoteObj = { id: Date.now(), text: inputNote.trim(), timestamp };
      const updatedNotes = {
        ...allNotes,
        [group.name]: [...(allNotes[group.name] || []), newNoteObj],
      };
      setAllNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      setInputNote("");
      setIsTextPresent(false);
    }
  }, [inputNote, allNotes, group.name]);

  const handleEdit = (noteId) => {
    setEditNoteId(noteId);
    const noteToEdit = allNotes[group.name].find(note => note.id === noteId);
    setNewNote(noteToEdit.text);
    setIsTextPresent(true);
  };

  const handleDelete = (noteId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmDelete) {
      const updatedNotes = {
        ...allNotes,
        [group.name]: allNotes[group.name].filter((note) => note.id !== noteId),
      };
      setAllNotes(updatedNotes);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
    }
  };

  const handleSaveEdit = () => {
    if (newNote.trim() === "") {
      alert("Cannot save an empty note.");
      return;
    }
  
    const updatedNotes = allNotes[group.name].map(note => {
      if (note.id === editNoteId) {
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
        return { ...note, text: newNote.trim(), timestamp };
      }
      return note;
    });
    setAllNotes({ ...allNotes, [group.name]: updatedNotes });
    localStorage.setItem("notes", JSON.stringify({ ...allNotes, [group.name]: updatedNotes }));
    setEditNoteId(null);
    setNewNote("");
    setIsTextPresent(false);
  };

  const groupNotes = allNotes[group.name] || [];

  return (
    <div className={styles.noteContainer}>
      <div className={styles.noteHeader}>
        {isSmallScreen && (
          <img
            className={styles.backButton}
            onClick={() => setSelectedGroup(null)}
            src={backBtn}
            alt="back button"
          />
        )}
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
              {editNoteId === note.id ? (
                <textarea
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Enter your text here..."
                  rows={10}
                  cols={130}
                />
              ) : (
                <p className={styles.noteText}>{note.text}</p>
              )}
              <h4 className={styles.noteTimestamp}>{note.timestamp}</h4>
              <div>
                {editNoteId === note.id ? (
                  <button onClick={handleSaveEdit}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(note.id)}>Edit</button>
                )}
                <button onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.noteInput}>
        <div className={styles.inputWrapper}>
          <textarea
            value={inputNote}
            onChange={(e) => {
              setInputNote(e.target.value);
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
