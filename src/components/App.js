import React, { Component } from 'react';
import getImagesByQuery from '../services/api';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import styles from './App.module.css';

const mapper = images => {
  return images.map(
    ({ id, webformatURL: smallImg, largeImageURL: largeImg }) => ({
      id,
      smallImg,
      largeImg,
    }),
  );
};

class App extends Component {
  state = {
    images: [],
    searchQuery: '',
    pageNumber: 1,
    isLoading: false,
    isModalOpen: false,
    imageToOpen: null,
    newSearch: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const { searchQuery, pageNumber, newSearch } = this.state;
    if (
      prevState.searchQuery !== searchQuery ||
      prevState.pageNumber !== pageNumber ||
      prevState.newSearch !== newSearch
    ) {
      this.onSearch(searchQuery, pageNumber);
    }
  }

  onSearch = async (searchQuery, pageNumber) => {
    this.setState({ isLoading: true });

    await getImagesByQuery(searchQuery, pageNumber)
      .then(res => {
        this.setState(prevState => ({
          images: [...prevState.images, ...mapper(res.data.hits)],
        }));
      })
      .catch(error => {
        throw new Error(error);
      })
      .finally(() => this.setState({ isLoading: false }));

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  onSubmitSearchbar = query => {
    this.setState(prevState => {
      return {
        searchQuery: query,
        images: [],
        pageNumber: 1,
        newSearch: !prevState.newSearch,
      };
    });
  };

  onLoadMore = () => {
    this.setState(prevState => ({
      pageNumber: prevState.pageNumber + 1,
    }));
  };

  onCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  onClickOnGalleryItem = e => {
    const imageId = e.target.closest('li').id;
    const { images } = this.state;
    const imageUrl = images.find(image => image.id === Number(imageId))
      .largeImg;

    this.setState({ isModalOpen: true, imageToOpen: imageUrl });
  };

  render() {
    const { images, isLoading, isModalOpen, imageToOpen } = this.state;

    return (
      <div className={styles.App}>
        {isLoading && <Loader />}
        {isModalOpen && (
          <Modal onCloseModal={this.onCloseModal} imageToOpen={imageToOpen} />
        )}
        <Searchbar onSubmit={this.onSubmitSearchbar} />
        <ImageGallery images={images} onClick={this.onClickOnGalleryItem} />
        {images.length > 0 && <Button onClick={this.onLoadMore} />}
      </div>
    );
  }
}

export default App;
