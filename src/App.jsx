// Импортируем компоненты из локальных файлов
import SearchBar from "./components/SearchBar/SearchBar"; // Компонент строки поиска
import ImageGallery from "./components/ImageGallery/ImageGallery"; // Компонент галереи изображений
import Loader from "./components/Loader/Loader"; // Компонент загрузчика
import ErrorMessage from "./components/ErrorMessage/ErrorMessage"; // Компонент для отображения ошибок
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn"; // Кнопка загрузки дополнительных данных
import ImageModal from "./components/ImageModal/ImageModal"; // Модальное окно для изображений

// Импортируем библиотеки и стили
import { Toaster } from "react-hot-toast"; // Компонент для отображения уведомлений
import axios from "axios"; // Библиотека для HTTP-запросов
import { toast } from "react-hot-toast"; // Утилита для создания уведомлений

import "./App.css"; // Импортируем стили

// Импортируем хуки из React
import { useState, useEffect } from "react"; // useState — для управления состоянием, useEffect — для побочных эффектов

// Главный компонент приложения
const App = () => {
  // Создаем состояния приложения
  const [articles, setArticles] = useState([]); // Список статей (изображений)
  const [isLoading, setIsLoading] = useState(false); // Индикатор загрузки данных
  const [isError, setIsError] = useState(false); // Индикатор ошибки
  const [page, setPage] = useState(1); // Текущая страница загрузки данных
  const [query, setQuery] = useState(""); // Текущий поисковый запрос
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние модального окна
  const [selectedImage, setSelectedImage] = useState(null); // Выбранное изображение для показа в модальном окне

  // Используем useEffect для загрузки данных при изменении query или page
  useEffect(() => {
    if (!query) return; // Если query (поисковый запрос) пустой, выходим из функции
    const getArticlesData = async () => {
      // Определяем асинхронную функцию для получения данных
      try {
        setIsLoading(true); // Устанавливаем индикатор загрузки
        setIsError(false); // Сбрасываем ошибку
        // Отправляем GET-запрос к API Unsplash
        const response = await axios.get(
          "https://api.unsplash.com/search/photos", // URL API
          {
            params: {
              client_id: "QMDTanrFRxmDZa0TOSP83SoJlYeOIIQjN5BoN10efLM", // Ключ API
              per_page: 9, // Количество изображений на странице
              page: page, // Номер текущей страницы
              query: query, // Поисковый запрос
            },
          }
        );

        // Если результатов нет, показываем ошибку и очищаем статьи
        if (response.data.results.length === 0) {
          toast.error("No images!"); // Уведомление об ошибке
          setArticles([]);
        } else {
          // Если данные есть, добавляем их к текущему списку
          setArticles((prev) => [...prev, ...response.data.results]);
        }
      } catch (error) {
        // В случае ошибки устанавливаем флаг и выводим ошибку в консоль
        setIsError(true);
        // console.error("Error fetching data: ", error);
      } finally {
        // Убираем индикатор загрузки
        setIsLoading(false);
      }
    };

    if (query) {
      // Загружаем данные, если есть поисковый запрос
      getArticlesData();
    }
  }, [page, query]); // Следим за изменением page и query

  // Обработчик изменения страницы
  const handleChangePage = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    setPage((prev) => prev + 1); // Увеличиваем номер страницы на 1
  };

  // Обработчик изменения поискового запроса
  const handleChangeQuery = (newQuery) => {
    if (newQuery === query) {
      // Если запрос не изменился, показываем ошибку
      toast.error("Please change query!");
      return;
    }
    setQuery(newQuery); // Устанавливаем новый запрос
    setArticles([]); // Очищаем текущие статьи
    setPage(1); // Сбрасываем номер страницы
  };

  // Открытие модального окна с изображением
  const openModal = (image) => {
    setSelectedImage(image); // Устанавливаем выбранное изображение
    setIsModalOpen(true); // Открываем модальное окно
  };

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false); // Закрываем модальное окно
    setSelectedImage(null); // Убираем выбранное изображение
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      {/* Компонент уведомлений */}
      <SearchBar handleChangeQuery={handleChangeQuery} /> {/* Строка поиска */}
      {isLoading && <Loader />}{" "}
      {/* Показать индикатор загрузки, если isLoading === true */}
      {isError && <ErrorMessage />}
      {/* Показать сообщение об ошибке, если isError === true */}
      {!isLoading &&
        !isError && ( // Если нет загрузки и ошибок
          <>
            <ImageGallery articles={articles} onImageClick={openModal} />
            {/* Галерея изображений */}
            {articles.length > 0 && ( // Показать кнопку "Загрузить больше", если есть статьи
              <LoadMoreBtn handleChangePage={handleChangePage} />
            )}
          </>
        )}
      <ImageModal
        isOpen={isModalOpen} // Открыто ли модальное окно
        onClose={closeModal} // Закрытие модального окна
        image={selectedImage} // Выбранное изображение
      />
    </>
  );
};

export default App; // Экспортируем компонент App