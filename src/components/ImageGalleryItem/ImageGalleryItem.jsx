import { useState } from 'react';
import PropTypes from 'prop-types';

import { Modal } from 'components/Modal/Modal';
import { ImgItem, ImgItemImage } from './ImageGalleryItem.styled';

export function ImageGalleryItem({ image }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalOpen = () => {
    setIsModalOpen(true);
  };

  const modalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ImgItem onClick={modalOpen}>
        <ImgItemImage src={image.webformatURL} alt="picture" />
      </ImgItem>
      {isModalOpen && <Modal onClose={modalClose} image={image} />}
    </>
  );
}

ImageGalleryItem.propTypes = {
  image: PropTypes.object.isRequired,
};
