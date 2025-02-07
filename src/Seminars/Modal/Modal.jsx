
import styles from './styles.module.sass';

const API_URL = "http://localhost:3004/seminars";

const Modal = ({ setSeminars, setDeleteSeminarId, deleteSeminarId }) => {
  const deleteSeminar = async () => {
    try {
      const response = await fetch(`${API_URL}/${deleteSeminarId}`, { method: "DELETE" });

      if (!response.ok) {
        throw new Error("Ошибка удаления");
      }

      setSeminars((prev) => prev.filter((s) => s.id !== deleteSeminarId));
      setDeleteSeminarId(null); // Закрываю модалку
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.xxx} onClick={() => setDeleteSeminarId(null)}>X</div>
      <div className={styles.btn}>
        <button onClick={deleteSeminar}>DELETE</button> 
        <button >Редактировать</button> 
      </div>
    </div>
  );
};
export default Modal;
