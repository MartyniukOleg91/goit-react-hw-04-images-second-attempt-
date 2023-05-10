import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
import React from 'react';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    currentSearch: '',
    pageNr: 1,
    modalOpen: false,
    modalImg: '',
    modalAlt: '',
    error: '',
  };

  handleSubmit = query => {
    this.setState({
      images: [],
      currentSearch: query,
      pageNr: 1,
    });
  };

  async componentDidUpdate(_, prevState) {
    const { currentSearch, pageNr } = this.state;

    if (
      currentSearch !== prevState.currentSearch ||
      pageNr !== prevState.pageNr
    ) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchImages(currentSearch, pageNr);

        this.setState({
          images: [...this.state.images, ...response],
        });
      } catch (error) {
        this.setState({ error: 'wrong' });
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleClickMore = async () => {
    this.setState(prevState => ({ pageNr: prevState.pageNr + 1 }));
  };

  handleImageClick = e => {
    this.setState({
      modalOpen: true,
      modalAlt: e.target.alt,
      modalImg: e.target.name,
    });
  };

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      modalImg: '',
      modalAlt: '',
    });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        {this.state.isLoading ? (
          <Loader />
        ) : (
          <React.Fragment>
            <Searchbar onSubmit={this.handleSubmit} />
            <ImageGallery
              onImageClick={this.handleImageClick}
              images={this.state.images}
            />
            {this.state.images.length > 0 ? (
              <Button onClick={this.handleClickMore} />
            ) : null}
          </React.Fragment>
        )}
        {this.state.modalOpen ? (
          <Modal
            src={this.state.modalImg}
            alt={this.state.modalAlt}
            handleClose={this.handleModalClose}
          />
        ) : null}
      </div>
    );
  }
}
