import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { GlobalStyle } from './GlobalStyle';
import ImageGallery from './ImageGallery/ImageGallery';
import { Layout } from './Layout';
import Searchbar from './Searchbar/Searchbar';
import { addImage } from 'services/api';
import Loader from './Loader/Loader';

export default function App() {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      return;
    }
    setError(null);
    addImage(query, page)
      .then(data => {
        if (data.hits.length === 0) {
          toast.error(`No results for ${this.state.query}`);
          
          return;
        }
        const normalizedImages = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => ({
          id,
          tags,
          webformatURL,
          largeImageURL,
        }))
        setResults(prev => [...prev, ...normalizedImages]);
        setTotal(data.totalHits);
        
      })
      .catch(error => {
        setError(error);
      }).finally(() => {
        setIsLoading(false);
      });
  }, [query, page]);

  const handleFormSubmit = query => {
    setQuery(query);
    setIsLoading(true);
    setPage(1);
    setResults([]);
    
  };

  const loadMore = () => {
    setPage((prev) => prev +1);
  };

  return (
    <Layout>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p>Something went wrong</p>}
      {isLoading ? (
        <Loader />
      ) : (
        <ImageGallery
          items={results}
          onLoadMoreClick={loadMore}
          allResults={total}
        />
      )}

      <Toaster />
      <GlobalStyle />
    </Layout>
  );
}
