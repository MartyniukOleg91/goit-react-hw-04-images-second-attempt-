import css from './Modal.module.css';
import propTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ src, alt, handleClose }) {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  const closeModalClick = e => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={css.Overlay} onClick={closeModalClick}>
      <div className={css.Modal}>
        <img src={src} alt={alt} />
      </div>
    </div>
  );
}

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};
