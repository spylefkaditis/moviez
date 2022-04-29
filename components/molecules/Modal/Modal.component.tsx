import { Button } from "../../atoms/Button";
import styles from "./Modal.module.css";

interface ModalProps {
  dismiss: () => void;
}

export const Modal = ({ dismiss }: ModalProps): JSX.Element => {
  return (
    <div
      className={styles.modal}
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDesc"
    >
      <div className={styles.modalInner}>
        <header className={styles.modalHeader}>
          <h2 id="modalTitle" className={styles.modalTitle}>
            Success! 🥳
          </h2>
          <span className={styles.closeButton}>
            <Button onClick={dismiss}>X</Button>
          </span>
        </header>
        <div className={styles.modalBody}>
          <p id="modalDesc">Your vote has been casted!</p>
        </div>
      </div>
    </div>
  );
};
