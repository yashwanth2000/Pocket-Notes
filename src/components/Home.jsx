import React, { useState, useEffect } from "react";
import NotesGroup, { getGroupInitials } from "./NotesGroup";
import NotesArea from "./NotesArea";
import notes from "../assets/notes.png";
import lock from "../assets/lock.png";
import styles from "./Home.module.css";

const Home = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768);

  const handleResize = () => {
    const isSmall = window.innerWidth < 768;
    setIsSmallScreen(isSmall);
    if (!isSmall) setSelectedGroup(null);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.main}>
      {isSmallScreen ? (
        selectedGroup ? (
          <NotesArea
            group={selectedGroup}
            getGroupInitials={getGroupInitials}
            setSelectedGroup={setSelectedGroup}
            isSmallScreen
          />
        ) : (
          <NotesGroup setSelectedGroup={setSelectedGroup} isSmallScreen />
        )
      ) : (
        <>
          <div className={styles.left}>
            <NotesGroup setSelectedGroup={setSelectedGroup} />
          </div>
          <div className={styles.right}>
            {selectedGroup ? (
              <NotesArea
                group={selectedGroup}
                getGroupInitials={getGroupInitials}
                setSelectedGroup={setSelectedGroup}
              />
            ) : (
              <Content />
            )}
          </div>
        </>
      )}
    </div>
  );
};

const Content = () => (
  <>
    <div className={styles.description}>
      <img src={notes} alt="notes" />
      <h2>Pocket Notes</h2>
      <p>
        Send and receive messages without keeping your phone online.
        <br />
        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>
    </div>
    <div className={styles["encryption-note"]}>
      <img src={lock} alt="lock" />
      End-to-End encrypted
    </div>
  </>
);

export default Home;
