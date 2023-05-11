import css from './Modal.module.css';
import propTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.handleClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  render() {
    return (
      <div className={css.Overlay} onClick={this.props.handleClose}>
        <div className={css.Modal}>
          <img src={this.props.src} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  src: propTypes.string.isRequired,
  alt: propTypes.string.isRequired,
  handleClose: propTypes.func.isRequired,
};
