import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={styles.ImageGallery} onClick={onClick} role="presentation">
      {images.map(image => (
        <ImageGalleryItem
          key={`img-${image.id}`}
          id={image.id}
          imageUrl={image.smallImg}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      smallImg: PropTypes.string,
      largeImg: PropTypes.string,
    }),
  ).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
