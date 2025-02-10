// Импортируем стили для компонента
import s from "./SearchBar.module.css"; // Модули CSS для стилизации компонента
// Импортируем нужные библиотеки и иконку
import { useState } from "react"; // Хук для управления состоянием
import { toast } from "react-hot-toast"; // Утилита для отображения уведомлений
import { FaSearch } from "react-icons/fa"; // Иконка поиска из библиотеки react-icons

// Компонент SearchBar принимает пропс handleChangeQuery, который используется для обработки нового запроса
const SearchBar = ({ handleChangeQuery }) => {
  // Локальное состояние для отслеживания введенного текста в поисковой строке
  const [search, setSearch] = useState("");

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы при отправке формы

    // Проверяем, пуст ли запрос, и показываем уведомление об ошибке, если он пустой
    if (search.trim() === "") {
      toast.error("Please enter a search query!"); // Выводим сообщение об ошибке
      return; // Прерываем выполнение функции
    }

    // Вызываем функцию handleChangeQuery с очищенным (trim) значением поискового запроса
    handleChangeQuery(search.trim());

    // Очищаем строку поиска после отправки
    setSearch("");
  };

  return (
    // Заголовок, содержащий форму поиска
    <header className={s.header}>
      {" "}
      {/* Применяем стили для заголовка */}
      <form onSubmit={handleSubmit} className={s.form}>
        {" "}
        {/* Обработка отправки формы */}
        <div className={s.input_form}>
          {" "}
          {/* Контейнер для кнопки и строки ввода */}
          <button type="submit" className={s.button}>
            {" "}
            {/* Кнопка отправки */}
            <FaSearch size={20} className={s.search_icon} />{" "}
            {/* Иконка поиска */}
          </button>
          <input
            className={s.input} // Стили для строки ввода
            type="text" // Текстовый ввод
            autoComplete="off" // Отключаем автозаполнение браузером
            autoFocus // Фокусируемся на поле ввода при загрузке страницы
            placeholder="Search images and photos" // Текст-подсказка в строке ввода
            value={search} // Привязываем значение к состоянию search
            onChange={(e) => setSearch(e.target.value)} // Обновляем состояние при изменении текста
          />
        </div>
      </form>
    </header>
  );
};

// Экспортируем компонент для использования в других частях приложения
export default SearchBar;