import React from 'react';
import '../styles/SearchBar.css';

// SearchBar component to display the search bar and media type filter
function SearchBar({ searchTerm, setSearchTerm, mediaType, setMediaType, onSearch }) {
    // Handle search button click
    const handleSearchClick = () => {
        if (!searchTerm.trim()) {
            alert('Please enter a search term.'); // Display alert if search term is empty
            return;
        }
        onSearch(); // Call onSearch function
    };

    return (
        <form
            className="input-group"
            onSubmit={(e) => {
                e.preventDefault();
                handleSearchClick(); // Handle form submission
            }}
        >
            <input
                type="text"
                className="form-control"
                placeholder="Search for music, movies, podcasts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)} // Handle search term input
                aria-label="Search term"
            />
            <select
                className="form-select"
                value={mediaType}
                onChange={(e) => setMediaType(e.target.value)} // Handle media type selection
                aria-label="Media type"
            >
                <option value="all">All</option>
                <option value="music">Music</option>
                <option value="movie">Movie</option>
                <option value="podcast">Podcast</option>
                <option value="ebook">Ebook</option>
                <option value="audiobook">Audiobook</option>
                <option value="software">Software</option>
                <option value="tvShow">TV Show</option>
            </select>
            <button className="btn btn-primary" type="submit">
                Search
            </button>
        </form>
    );
}

// Export SearchBar component
export default SearchBar;
