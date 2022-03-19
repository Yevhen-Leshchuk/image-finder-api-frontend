import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import pixabayApi from './services/pixabayApi';
import s from 'App.module.css';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    showModal: false,
    largeImageURL: '',
    tags: '',
    currentPage: 1,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName) {
      this.fetchImages(this.setState({ nextName }));
    }
  }

  fetchImages = () => {
    const { currentPage, imageName } = this.state;
    const options = { currentPage, imageName };

    this.setState({ isLoading: true });

    pixabayApi
      .fetchImages(options)
      .then(hits => {
        this.setState(({ images, currentPage }) => ({
          images: [...images, ...hits],
          currentPage: currentPage + 1,
        }));
      })
      .catch(error => this.setState({ error }))
      .finally(() => {
        this.setState({ isLoading: false });
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  };

  handleFormSubmit = imageName => {
    this.setState({
      imageName: imageName,
      currentPage: 1,
      images: [],
      error: null,
    });
  };

  toggleModal = (largeImage, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImage,
      tags: tags,
    }));
  };

  render() {
    const { images, showModal, largeImageURL, tags, isLoading } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onClick={this.toggleModal} />
        {images.length > 0 && <Button onClick={this.fetchImages} />}
        {isLoading && <Loader />}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
        <ToastContainer autoClose={3000} position="top-right" type="default" />
      </div>
    );
  }
}

export default App;
