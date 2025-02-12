import React from 'react';
import '../styles/ResultCard.css';

// ResultCard component to display a single item
function ResultCard({ item, onAction, actionLabel }) {
    const placeholderImage = '/placeholder.jpg'; // Placeholder image URL

    return (
        <div className="card">
            <img
                src={item.artworkUrl100 || placeholderImage} // Use artwork URL or placeholder image
                alt={item.trackName || 'Unknown'} // Use track name or 'Unknown'
                className="card-img-top"
            />
            <div className="card-body">
                <h5 className="card-title">{item.trackName || 'Unknown'}</h5> {/* Use track name or 'Unknown' */}
                <p className="card-text">
                    {item.artistName || 'Unknown Artist'} {/* Use artist name or 'Unknown Artist' */}
                </p>
                <p className="card-text">
                    Release Date: {item.releaseDate ? new Date(item.releaseDate).toLocaleDateString() : 'Unknown'} {/* Use release date or 'Unknown' */}
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => onAction(item)} // Handle action on button click
                >
                    {actionLabel} {/* Action button label */}
                </button>
            </div>
        </div>
    );
}

// Export ResultCard component
export default ResultCard;
