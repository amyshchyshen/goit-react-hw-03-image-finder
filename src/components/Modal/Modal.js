import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func.isRequired,
    imageToOpen: PropTypes.string.isRequired,
  };

  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEscape);
  }

  closeOnEscape = e => {
    if (e.code !== 'Escape') {
      return;
    }
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  handleCloseModal = e => {
    if (e.target !== e.currentTarget) {
      return;
    }
    const { onCloseModal } = this.props;
    onCloseModal();
  };

  render() {
    const { imageToOpen } = this.props;

    return (
      <div
        className={styles.Overlay}
        onClick={this.handleCloseModal}
        role="presentation"
      >
        <div className={styles.Modal}>
          <img src={imageToOpen} alt="" />
        </div>
      </div>
    );
  }
}

export default Modal;
