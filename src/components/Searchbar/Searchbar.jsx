import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';
import toast from 'react-hot-toast';
import {
  SearchingBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [request, setRequest] = useState('');

  const handleRequestChange = evt => {
    setRequest(evt.currentTarget.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    if (request.trim() === '') {
      return toast.error('Write your request!');
    }

    onSubmit(request);
    setRequest('');

    evt.target.reset();
  };

  return (
    <SearchingBar>
      <SearchForm className="form" onSubmit={handleSubmit}>
        <SearchFormButton type="submit" className="button">
          <ImSearch />
        </SearchFormButton>

        <SearchFormInput
          className="input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={request}
          onChange={handleRequestChange}
        />
      </SearchForm>
    </SearchingBar>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
