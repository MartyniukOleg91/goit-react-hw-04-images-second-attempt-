import { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from './api/fetchImages';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import React from 'react';

export default function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSearch, setCurrentSearch] = useState('');
  const [pageNr, setPageNr] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImg, setModalImg] = useState('');
  const [totalImages, setTotalImages] = useState(0);
  const [modalAlt, setModalAlt] = useState('');

  const handleSubmit = query => {
    setImages([]);
    setCurrentSearch(query);
    setPageNr(1);
    setTotalImages(0);
  };

  const handleClickMore = async () => {
    setPageNr(prevPage => prevPage + 1);
  };

  useEffect(() => {
    if (!currentSearch) return;
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        const { images, totalImages } = await fetchImages(
          currentSearch,
          pageNr
        );
        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages(totalImages);
      } catch (error) {
        console.log('error');
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();
  }, [pageNr, currentSearch]);

  const handleImageClick = e => {
    setModalOpen(true);
    setModalAlt(e.target.alt);
    setModalImg(e.target.name);
  };

  const handleModalClose = e => {
    setModalOpen(false);
    setModalAlt('');
    setModalImg('');
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar onSubmit={handleSubmit} />
      <React.Fragment>
        {images.length && (
          <ImageGallery onImageClick={handleImageClick} images={images} />
        )}

        {!isLoading && images.length !== totalImages && (
          <Button onClick={handleClickMore} />
        )}
      </React.Fragment>
      {isLoading && <Loader />}
      {modalOpen ? (
        <Modal src={modalImg} alt={modalAlt} handleClose={handleModalClose} />
      ) : null}
    </div>
  );
}
