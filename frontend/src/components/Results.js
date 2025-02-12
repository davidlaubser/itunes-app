import React from 'react';
import ResultCard from './ResultCard';
import '../styles/Results.css';

// Results component to display the list of search results
function Results({ results, onAddToFavorites, onSort }) {
    return (
        <div className="results">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Results</h2>
                <select
                    className="form-select"
                    onChange={(e) => onSort(e.target.value)} // Handle sorting of results
                >
                    <option value="default">Sort By</option>
                    <option value="name">Name</option>
                    <option value="artist">Artist</option>
                    <option value="date">Release Date</option>
                </select>
            </div>
            <div className="list-group">
                {results.map((item, index) => (
                    <ResultCard
                        key={index} // Use unique key for each item
                        item={item} // Result item data
                        onAction={onAddToFavorites} // Handle add to favorites action
                        actionLabel="Add to Favorites" // Action button label
                    />
                ))}
            </div>
        </div>
    );
}

// Export Results component
export default Results;
