import React from 'react';

const SearchBar = ({ searchQuery, handleSearchChange }) => {
    return (
        <div className="mb-3 d-flex align-items-center"> 
            <div className="subtitle me-2">Search:</div> 
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
