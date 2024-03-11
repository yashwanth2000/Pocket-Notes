import { useState } from "react";
import Modal from "./Modal";
import styles from "./NotesGroup.module.css";

const NotesGroup = () => {
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  const addGroup = () => {
    const normalizedGroupName = groupName.trim().replace(/\s/g, "").toLowerCase();
    const groupExists = groups.some(
      (group) => group.name.trim().replace(/\s/g, "").toLowerCase() === normalizedGroupName
    );

    if (groupName.trim() && selectedColor && !groupExists) {
      setGroups([...groups, { name: groupName, color: selectedColor }]);
      setGroupName("");
      setSelectedColor("");
      setShowModal(false);
    } else if (groupExists) {
      alert("Group name already exists. Please choose a different name.");
    }
  };

  const handleChangeGroupName = (event) => setGroupName(event.target.value);

  const handleColorSelect = (color) => setSelectedColor(color);

  const getGroupInitials = (name) =>
    name.includes(" ")
      ? name.split(" ").map((word) => word.charAt(0)).join("").toUpperCase()
      : name.charAt(0).toUpperCase();

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Pocket Notes</h1>
      <div className={styles.groupContainer}>
        <div className={styles.groupWrapper}>
          {groups.map((group, index) => (
            <div key={index} className={styles.groupItem}>
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
        />
      )}
    </div>
  );
};

export default NotesGroup;