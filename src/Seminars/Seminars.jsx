import Modal from './Modal/Modal';
import styles from './styles.module.sass';
import { useEffect, useState } from "react";

const API_URL = "http://localhost:3004/seminars"; //получаю server.json 

const Seminars = ({closeSeminar, setCloseSeminar}) => {
  const [seminars, setSeminars] = useState([]);
  const [deleteSeminarId, setDeleteSeminarId] = useState(null); // ID семинара для удаления
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setSeminars(Array.isArray(data) ? data : data?.seminars || [])) //делаю проверку массива
      .catch((err) => {
        console.error("Ошибка загрузки:", err);
        setError("Не удалось загрузить данные");
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Семинары</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p className={styles.error}>{error}</p>}
      <ul> 
        {seminars.map((seminar) => ( //прогоняю массив через map
          <li key={seminar.id} className={styles.seminar}>
            <h2>{seminar.title}</h2>
            <p>{seminar.description}</p>
            <p>
              <strong>Дата:</strong> {seminar.date} <strong>Время:</strong> {seminar.time}
            </p>
            <img src={seminar.photo} alt={seminar.title} />
            <button
              className={styles.btn}
              onClick={() => setDeleteSeminarId(seminar.id)} // Сохраняю ID семинара
            >
              Удалить семинар
            </button>

            {/* Показываю `Modal` только для выбранного семинара */}
            {deleteSeminarId === seminar.id && (
              <Modal
              setSeminars={setSeminars}
              setDeleteSeminarId={setDeleteSeminarId} 
              deleteSeminarId={deleteSeminarId}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Seminars;
