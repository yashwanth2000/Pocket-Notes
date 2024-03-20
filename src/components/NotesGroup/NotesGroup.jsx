import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal.jsx";
import styles from "./NotesGroup.module.css";

export function getGroupInitials(name) {
  if (!name) {
    throw new Error("Group name is null or empty");
  }

  const words = name.trim().split(/\s+/);

  if (words.length === 0) {
    throw new Error("Group name contains no valid words");
  }

  return words.reduce((initials, word) => {
    if (!word) {
      throw new Error("Group name contains empty word");
    }
    return initials + word.charAt(0).toUpperCase();
  }, "");
}


const NotesGroup = ({ setSelectedGroup }) => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedGroupState, setSelectedGroupState] = useState(null);

  useEffect(() => {
    const savedGroups = localStorage.getItem("groups");
    if (savedGroups) {
      setGroups(JSON.parse(savedGroups));
    }
  }, []);

  const addGroup = () => {
    const normalizedGroupName = groupName
      .trim()
      .replace(/\s/g, "")
      .toLowerCase();
    const groupExists = groups.some(
      (group) =>
        group.name.trim().replace(/\s/g, "").toLowerCase() ===
        normalizedGroupName
    );

    if (groupName.trim() && selectedColor && !groupExists) {
      const newGroup = { name: groupName, color: selectedColor };
      setGroups([...groups, newGroup]);
      localStorage.setItem("groups", JSON.stringify([...groups, newGroup]));
      setGroupName("");
      setSelectedColor("");
      setShowModal(false);
    } else {
      setShowModal(false);
    }
  };

  const handleChangeGroupName = (event) => setGroupName(event.target.value);
  const handleColorSelect = (color) => setSelectedColor(color);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Pocket Notes</h1>
      <div className={styles.groupContainer}>
        <div className={styles.groupWrapper}>
          {groups.map((group, index) => (
            <div
              key={index}
              className={`${styles.groupItem} ${
                selectedGroupState === group ? styles.selected : ""
              }`}
              onClick={() => {
                setSelectedGroup(group);
                setSelectedGroupState(group);
              }}
            >
              <div
                className={styles.groupCircle}
                style={{ backgroundColor: group.color }}
              >
                {getGroupInitials(group.name)}
              </div>
              <span className={styles.groupName}>{group.name}</span>
            </div>
          ))}
        </div>
      </div>
      <button className={styles.plus} onClick={() => setShowModal(true)}>
        +
      </button>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          addGroup={addGroup}
          groupName={groupName}
          selectedColor={selectedColor}
          handleChangeGroupName={handleChangeGroupName}
          handleColorSelect={handleColorSelect}
          groups={groups}
        />
      )}
    </div>
  );
};

export default NotesGroup;
