import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ webformatURL, tags, largeImageURL, onClick }) => {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => onClick(largeImageURL, tags)}
    >
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
};

export default ImageGalleryItem;
