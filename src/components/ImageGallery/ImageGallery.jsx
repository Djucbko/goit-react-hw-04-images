import { Component } from 'react';
import PropTypes from 'prop-types';
import s from './ImageGallery.module.css';
import getImages from '../../services/imgApi';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Loader from '../Loader/Loader';
import Button from '../Button/Button';

export default class ImageGallery extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
  };

  state = {
    images: [],
    status: 'idle',
    totalHits: 0,
    showButton: false,
    totalImages: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.inputValue !== this.props.inputValue || prevProps.page !== this.props.page) {
      this.setState({ status: 'pending' });
      getImages(this.props.inputValue, this.props.page)

        .then (response => this.setState(prevState => (
           {
         images:  [...prevState.images, ...response.hits],
         totalHits: response.totalHits,
           status: 'resolve',
            showButton: this.props.page === Math.ceil(this.state.totalHits / 12),
           totalImages: response.totalHits,
         }))
        )  
          
      .catch(error => this.setState({ status: 'rejected' }))
      
    }
  }

  

  render() {
    const { images, status, showButton } = this.state;
    
    if (status === 'pending') {
      return <Loader />;
    }

    if (images.length > 0) {
      return (
        <ul className={s.gallery}>
          {images.map(({ id, largeImageURL, tags }) => (
            <ImageGalleryItem
              key={id}
              url={largeImageURL}
              tags={tags}
              onClick={this.props.onClick}
            />
          ))}
        </ul>
      );
    }

    if (status === "resolve" && !showButton) {
      return <Button onClick={this.props.loadMoreBtn} />;
    }
  }
}



