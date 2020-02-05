import React from 'react';
import LoaderComponent from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.Loader}>
      <LoaderComponent
        type="ThreeDots"
        color="#3f51b5"
        height={100}
        width={100}
      />
    </div>
  );
};

export default Loader;
