import { useState, useEffect, useCallback } from "react";
import styles from "./NotesArea.module.css";
import arrow from "../../assets/arrow.png";
import arrow2 from "../../assets/arrow2.png";
import backBtn from "../../assets/backBtn.png";
import saveIcon from "../../assets/static-save.png";
import editIcon from "../../assets/edit-static.png";
import deleteIcon from "../../assets/delete-static.png";
import { ToastContainer, toast, Zoom, Slide, Bounce } from 'react-toastify';

const NotesArea = ({
  group,
  getGroupInitials,
  setSelectedGroup,
  isSmallScreen,
}) => {

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
    const updatedNotes = {
      ...allNotes,
      [group.name]: allNotes[group.name].filter((note) => note.id !== noteId),
    };
    setAllNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));

    toast.success('Note deleted!', {
      position: 'top-right',
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: 'dark',
      transition : Bounce
    });
  };

  const handleSaveEdit = () => {
    if (newNote.trim() === "") {
      toast.warn('Cannot save an empty note.', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: 'dark',
        transition : Slide
      });
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
  
    // Check if the new text is different from the existing text
    const editedNote = updatedNotes.find(note => note.id === editNoteId);
    const existingNote = allNotes[group.name].find(note => note.id === editNoteId);
    if (editedNote.text !== existingNote.text) {
      toast.success('Note edited!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: 'dark',
        transition : Zoom
      });
    }
  
    setAllNotes({ ...allNotes, [group.name]: updatedNotes });
    localStorage.setItem("notes", JSON.stringify({ ...allNotes, [group.name]: updatedNotes }));
    setEditNoteId(null);
    setNewNote("");
    setIsTextPresent(false);
  };
  

  const groupNotes = allNotes[group.name] || [];

  return (
    <div className={styles.noteContainer}>
      <ToastContainer />
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
                  placeholder={`${note.text} - Update your note here...`}
                  rows={10}
                  cols={130}
                  className={styles.editTextarea}
                />
              ) : (
                <p className={styles.noteText}>{note.text}</p>
              )}
              <h4 className={styles.noteTimestamp}>{note.timestamp}</h4>
              <div>
                {editNoteId === note.id ? (
                  <img src={saveIcon} onClick={handleSaveEdit} alt="save" className={styles.saveIcon} />
                ) : (
                  <img src={editIcon} onClick={() => handleEdit(note.id)} alt="edit" className={styles.editIcon} />
                )}
                <img src={deleteIcon} onClick={() => handleDelete(note.id)} alt="delete" className={styles.deleteIcon} />
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