import styles from "./Spinner.module.css";

export default function Spinner() {
    return (
        <div className={styles["spinner"]}>
            <div className={styles["double-bounce1"]}></div>
            <div className={styles["double-bounce2"]}></div>
        </div>
    );
}
