import React from 'react';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="mb-3 d-flex align-items-center"> {/* Use flexbox to align items */}
            <div className="subtitle me-2">Search:</div> {/* Apply subtitle style and margin */}
            <input
                type="text"
                className="form-control"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearchChange}
            />
        </div>
    );
}

export default SearchBar;
