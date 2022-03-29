import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import pixabayApi from './services/pixabayApi';
import s from 'App.module.css';

function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [tags, setTags] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const options = { currentPage, imageName };

    if (!imageName) {
      return;
    }
    const fetchImages = () => {
      setIsLoading(true);

      pixabayApi
        .fetchImages(options)
        .then(hits => {
          setImages(prevImages => [...prevImages, ...hits]);
        })
        .catch(error => setError(error))
        .finally(() => {
          setIsLoading(false);
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        });
    };
    fetchImages();
  }, [imageName, currentPage, error]);

  const updatePage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setCurrentPage(1);
    setImages([]);
    setError(null);
  };

  const toggleModal = (largeImage, tags) => {
    setShowModal(!showModal);
    setLargeImageURL(largeImage);
    setTags(tags);
  };

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onClick={toggleModal} />
      {images.length > 0 && <Button onClick={updatePage} />}
      {isLoading && <Loader />}
      {showModal && (
        <Modal
          onClose={toggleModal}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      )}
      <ToastContainer autoClose={3000} position="top-right" type="default" />
    </div>
  );
}

export default App;
