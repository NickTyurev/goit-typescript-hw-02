import s from "./LoadMoreBtn.module.css"; // Импортируем стили из файла LoadMoreBtn.module.css

// Компонент LoadMoreBtn принимает пропс handleChangePage для обработки клика по кнопке
const LoadMoreBtn = ({ handleChangePage }) => {
  // console.log("Load More button clicked"); // Лог для отладки, чтобы проверить, вызывается ли клик

  return (
    // Контейнер для кнопки с применением стилей из модуля CSS
    <div className={s.Container}>
      <button
        onClick={handleChangePage} // Обработчик клика, переданный через пропс
        className={s.LoadMoreBtn} // Стили для кнопки загрузки
        type="button" // Устанавливаем тип кнопки как обычную кнопку (не отправляющую форму)
      >
        Load More
        {/* Текст на кнопке */}
      </button>
    </div>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default LoadMoreBtn;