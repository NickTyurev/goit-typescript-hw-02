import ImageCard from "../ImageCard/ImageCard"; // Импортируем компонент ImageCard для отображения изображений
import s from "./ImageGallery.module.css"; // Импортируем стили для галереи изображений из файла ImageGallery.module.css

// Компонент ImageGallery принимает два пропса: articles (массив изображений) и onImageClick (функция для обработки клика по изображению)
const ImageGallery = ({ articles, onImageClick }) => {
  return (
    // Список изображений с применением стилей для отображения галереи
    <ul className={s.gallery_list}>
      {/* Метод map используется для перебора массива articles и отображения каждого изображения */}
      {articles.map((article) => (
        // Для каждого изображения создается элемент списка <li> с уникальным ключом
        <li key={article.id}>
          <div>
            {/* Компонент ImageCard отображает изображение, передаем ему src, alt и onClick */}
            <ImageCard
              src={article.urls.small} 
              alt={article.alt_description || "Image"} 
              onClick={() => onImageClick(article)} 
            />
          </div>
        </li>
      ))}
    </ul>
  );
};


export default ImageGallery;