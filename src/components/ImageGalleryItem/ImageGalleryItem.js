import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ imageUrl, id }) => (
  <li id={id}>
    <img src={imageUrl} alt="" className={styles.ImageGalleryItem_image} />
  </li>
);

ImageGalleryItem.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default ImageGalleryItem;
