import { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({
  setShowModal,
  addGroup,
  groupName,
  selectedColor,
  handleChangeGroupName,
  handleColorSelect,
  groups,
}) => {
  const colors = [
    "#0047FF",
    "#43E6FC",
    "#6691FF",
    "#B38BFA",
    "#F19576",
    "#FF79F2",
  ];
  const modalRef = useRef();
  const [closing, setClosing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setClosing(true);
        setTimeout(() => {
          setShowModal(false);
        }, 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowModal]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (groupName.trim() === "" || selectedColor === "") {
      setSuccessMessage("");
      setErrorMessage("");
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 600);
      return;
    }

    const normalizedGroupName = groupName
      .trim()
      .replace(/\s/g, "")
      .toLowerCase();
    const groupExists = groups.some(
      (group) =>
        group.name.trim().replace(/\s/g, "").toLowerCase() ===
        normalizedGroupName
    );

    if (groupExists) {
      setSuccessMessage("");
      setErrorMessage("Group name already exists!");
      setTimeout(() => setErrorMessage(""), 600);
    } else {
      setErrorMessage("");
      setShowWarning(false);
      setSuccessMessage("Group Added!");
      setClosing(true);
      setTimeout(() => {
        addGroup();
        setShowModal(false);
        setSuccessMessage("");
      }, 700);
    }
  };

  return (
    <>
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      {errorMessage && (
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
      {showWarning && (
        <div className={styles.warningMessage}>Select both name and color!</div>
      )}
      <div
        className={`${styles.modal} ${closing && styles.fadeOut}`}
        ref={modalRef}
      >
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
    </>
  );
};

export default Modal;
