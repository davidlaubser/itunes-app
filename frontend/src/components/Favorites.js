import React from 'react';
import ResultCard from './ResultCard';
import '../styles/Favorites.css';

// Favorites component to display the list of favorite items
function Favorites({ favorites, onRemoveFromFavorites, onSort }) {
    return (
        <div className="favorites">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>
                    Favorites <span className="badge bg-secondary">{favorites.length}</span> {/* Display the number of favorites */}
                </h2>
                <select
                    className="form-select"
                    onChange={(e) => onSort(e.target.value)} // Handle sorting of favorites
                >
                    <option value="default">Sort By</option>
                    <option value="name">Name</option>
                    <option value="artist">Artist</option>
                    <option value="date">Release Date</option>
                </select>
            </div>
            {favorites.length === 0 ? (
                <p className="text-muted">No favorites yet.</p> // Message when no favorites are available
            ) : (
                <div className="list-group">
                    {favorites.map((item, index) => (
                        <ResultCard
                            key={index} // Use unique key for each item
                            item={item} // Favorite item data
                            onAction={onRemoveFromFavorites} // Handle remove from favorites action
                            actionLabel="Remove" // Action button label
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

// Export Favorites component
export default Favorites;
