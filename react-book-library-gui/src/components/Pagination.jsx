import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <ButtonGroup aria-label="Pagination" className="mt-4">
            <Button
                variant="secondary"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
            >
                Previous
            </Button>
            {pageNumbers.map(number => (
                <Button
                    key={number}
                    variant={number === currentPage ? "primary" : "secondary"}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </Button>
            ))}
            <Button
                variant="secondary"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
            >
                Next
            </Button>
        </ButtonGroup>
    );
}

export default Pagination;
