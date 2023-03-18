import PropTypes from 'prop-types';

import { ImageList } from './ImageGallery.styled';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import LoadMoreBtn from 'components/LoadMoreButton/Button';

export default function ImageGallery({ items, onLoadMoreClick, allResults }) {
  return (
    <div>
      <ImageList>
        {items.map(item => (
          <li key={item.id}>
            <ImageGalleryItem image={item} />
          </li>
        ))}
      </ImageList>

      {items.length > 0 && items.length < allResults && (
        <LoadMoreBtn onBtnClick={() => onLoadMoreClick()} />
      )}
    </div>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.array.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired,
  allResults: PropTypes.number.isRequired,
};
