import { useState } from "react";
import styles from "./app.module.css";

function App() {
  const [value, setValue] = useState("");
  const [list, setList] = useState([]);
  const [error, setError] = useState("");
  // const [isValueVaild, setValueVaild] = useState(false);
  const isValueVaild = value.trim().length >= 3;

  const onInputButtonClick = () => {
    let promptValue = prompt("Введенное значение");
    if (promptValue.trim().length < 3) {
      setError("Введенное значение должно содержать минимум 3 символа");
      return;
    }

    setError("");
    // setValueVaild(true);
    setValue(promptValue);
  };

  const onAddButtonClick = () => {
    if (value) {
      setList((prev) => [...prev, { id: Date.now(), value: value }]);
      setValue("");
      setError("");
      // setValueVaild(false);
    }
  };

  return (
    <div className={styles.app}>
      <h1 className={styles["page-heading"]}>Ввод значения</h1>
      <p className={styles["no-margin-text"]}>
        Текущее значение <code>value</code>: "
        <output className={styles["current-value"]}>{value}</output>"
      </p>
      {error !== "" && <div className={styles.error}>{error}</div>}
      <div className={styles["buttons-container"]}>
        <button onClick={onInputButtonClick} className={styles.button}>
          Ввести новое
        </button>
        <button
          onClick={onAddButtonClick}
          className={styles.button}
          disabled={!isValueVaild}
        >
          Добавить в список
        </button>
      </div>
      <div className={styles["list-container"]}>
        <h2 className={styles["list-heading"]}>Список:</h2>
        {list.length === 0 && (
          <p className={styles["no-margin-text"]}>Нет добавленных элементов</p>
        )}

        {list.length !== 0 && (
          <ul className={styles.list}>
            {list.map(({ id, value }) => (
              <li key={id} className={styles["list-item"]}>
                {value} {new Date(id).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
