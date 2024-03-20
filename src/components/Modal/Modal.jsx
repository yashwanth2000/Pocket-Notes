import { useState, useEffect, useRef } from "react";
import { ToastContainer, toast , Zoom, Flip, Bounce }from "react-toastify";
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

    if (!groupName.trim() || !selectedColor) {
      toast.warn("Select both name and color!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Flip,
      });
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
      toast.error("Group name already exists!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition: Bounce
      });
    } else {
      toast.success("Group Added!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "dark",
        transition : Zoom
      });
      setClosing(true);
      setTimeout(() => {
        addGroup();
        setShowModal(false);
      }, 1000);
    }
  };

  return (
    <>
      <ToastContainer />
      <div
        className={`${styles.modal} ${closing && styles.fadeOut}`}
        ref={modalRef}
      >
        <form onSubmit={handleSubmit}>
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
