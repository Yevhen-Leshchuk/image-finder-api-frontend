import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Button from './components/Button';
// import Loader from './components/Loader';
import Modal from './components/Modal';
import s from 'App.module.css';

const apiKey = '23316117-157eac1742a52b03f27289157';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    showModal: false,
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    if (prevName !== nextName) {
      fetch(
        `https://pixabay.com/api/?q=${nextName}&page=1&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=15`
      )
        .then(response => response.json())
        .then(images => this.setState({ images: images.hits }));
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  toggleModal = (largeImage, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      largeImageURL: largeImage,
      tags: tags,
    }));
  };

  render() {
    const { images, showModal, largeImageURL, tags } = this.state;

    return (
      <div className={s.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} onClick={this.toggleModal} />
        {images.length > 0 && <Button />}
        {/* <Loader /> */}
        {showModal && (
          <Modal
            onClose={this.toggleModal}
            largeImageURL={largeImageURL}
            tags={tags}
          />
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
