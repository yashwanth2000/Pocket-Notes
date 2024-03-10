import notes from "../assets/notes.png";
import lock from "../assets/lock.png";
import styles from "./Home.module.css";
import NotesGroup from "./NotesGroup";
const Home = () => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <h1>Pocket Notes</h1>
        <NotesGroup />
      </div>
      <div className={styles.right}>
        <div className={styles.description}>
          <img src={notes} alt="notes" />
          <h2>Pocket Notes</h2>
          <p>
            Send and receive messages without keeping your phone online.
            <br></br>
            Use Pocket Notes on up to 4 linked devices and 1 mobile phone
          </p>
        </div>
        <div className={styles["encryption-note"]}>
          <img src={lock} alt="lock" /> End-to-End encrypted
        </div>
      </div>
    </div>
  );
};

export default Home;
