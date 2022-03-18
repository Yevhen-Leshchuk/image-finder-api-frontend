import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={s.ImageGallery}>
      {images.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          tags={tags}
          largeImageURL={largeImageURL}
          onClick={onClick}
        />
      ))}
    </ul>
  );
};

export default ImageGallery;
