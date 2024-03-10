import { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ setShowModal }) => {
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [error, setError] = useState("");
  const colors = [
    "#d9b3ff",
    "#bae1ff",
    "#a0e7e5",
    "#ffdfba",
    "#ffb3ba",
    "#b3b3ff",
  ];
  
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  const handleChangeGroupName = (event) => {
    setGroupName(event.target.value);
    setError("");
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!groupName.trim()) {
      setError("Please enter a group name.");
      return;
    }
    setGroupName("");
    setSelectedColor("");
    setShowModal(false);
  };

  return (
    <div className={styles.modal}>
      <form onSubmit={handleSubmit} ref={modalRef}>
        <h2 className={styles.heading}>Create new group</h2>
        <label htmlFor="group-name" className={styles.groupName}>
          Group Name
        </label>
        <input
          type="text"
          id="group-name"
          value={groupName}
          onChange={handleChangeGroupName}
          className={styles.inputGroup}
          placeholder="Enter group name"
          autoComplete="off"
        />
        {error && <div className={styles.error}>{error}</div>}
        <div className={styles.colorContainer}>
          <label htmlFor="group-color" className={styles.groupColor}>
            Choose Color
          </label>
          <div className={styles.colorPalette}>
            {colors.map((color) => (
              <div
                key={color}
                className={`${styles.colorCircle} ${
                  selectedColor === color ? styles.selected : ""
                }`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
        <button type="submit" className={styles.createBtn}>
          Create
        </button>
      </form>
    </div>
  );
}

export default Modal;