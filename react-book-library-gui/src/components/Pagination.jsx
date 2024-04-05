import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

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
