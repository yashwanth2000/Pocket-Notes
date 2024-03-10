import { useState } from "react";
import Modal from "./Modal";
import styles from "./NotesGroup.module.css";

const NotesGroup = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button className={styles.plus} onClick={() => setShowModal(true)}>
        +
      </button>
      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
};

export default NotesGroup;
