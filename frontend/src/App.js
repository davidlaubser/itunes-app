import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import API from './api';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import Favorites from './components/Favorites';

const App = () => {
  const [token, setToken] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');
  const [results, setResults] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const [favoriteSortOrder, setFavoriteSortOrder] = useState('default');

  // Fetch token on component mount
  useEffect(() => {
    API.get('/token')
      .then(res => {
        setToken(res.data.token); // Set token state
      })
      .catch(err => {
        console.error('Error fetching token:', err);
        alert('Failed to fetch token. Please try again later.');
      });
  }, []);

  // Handle search request
  const handleSearch = () => {
    if (!token) {
      alert('Token not available. Please wait.');
      return;
    }
    setLoading(true);
    API.get('/search', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        term: searchTerm,
        media: mediaType,
      },
    })
      .then(res => {
        if (res.data.length === 0) {
          alert('No results found. Try a different search.');
        }
        setResults(res.data); // Set results state
      })
      .catch(err => console.error('Search error:', err))
      .finally(() => setLoading(false));
  };

  // Handle sorting of results
  const handleSort = (order) => {
    setSortOrder(order);
    let sortedResults = [...results];
    if (order === 'name') {
      sortedResults.sort((a, b) => a.trackName.localeCompare(b.trackName));
    } else if (order === 'artist') {
      sortedResults.sort((a, b) => a.artistName.localeCompare(b.artistName));
    } else if (order === 'date') {
      sortedResults.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
    setResults(sortedResults);
  };

  // Handle sorting of favorites
  const handleFavoriteSort = (order) => {
    setFavoriteSortOrder(order);
    let sortedFavorites = [...favorites];
    if (order === 'name') {
      sortedFavorites.sort((a, b) => a.trackName.localeCompare(b.trackName));
    } else if (order === 'artist') {
      sortedFavorites.sort((a, b) => a.artistName.localeCompare(b.artistName));
    } else if (order === 'date') {
      sortedFavorites.sort((a, b) => new Date(a.releaseDate) - new Date(b.releaseDate));
    }
    setFavorites(sortedFavorites);
  };

  // Add item to favorites
  const addToFavorites = (item) => {
    setFavorites((prev) => {
      if (prev.some(fav => fav.trackName === item.trackName)) {
        if (!toast.isActive('favorite-warning')) {
          toast.warning('This item is already in your favorites.', {
            toastId: 'favorite-warning',
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        return prev;
      }
      if (!toast.isActive('favorite-success')) {
        toast.success('Added to favorites!', {
          toastId: 'favorite-success',
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      return [...prev, item];
    });
  };

  // Remove item from favorites
  const removeFromFavorites = item => {
    setFavorites(prev => prev.filter(fav => fav.trackName !== item.trackName));
  };

  return (
    <div className="App">
      <ToastContainer />
      <div className="container">
        <div className="header-container">
          <h1 className="text-center my-4">iTunes Search</h1>
        </div>
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          mediaType={mediaType}
          setMediaType={setMediaType}
          onSearch={handleSearch}
        />
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
        <div className="row">
          <div className="col-md-6">
            <Results
              results={results}
              onAddToFavorites={addToFavorites}
              onSort={handleSort}
              sortOrder={sortOrder}
            />
          </div>
          <div className="col-md-6">
            <Favorites
              favorites={favorites}
              onRemoveFromFavorites={removeFromFavorites}
              onSort={handleFavoriteSort}
              sortOrder={favoriteSortOrder}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Export App component
export default App;